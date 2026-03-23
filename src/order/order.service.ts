import {
	BadRequestException,
	Injectable,
	Logger,
	UnauthorizedException
} from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { CreateOrderDto } from './dto/create-order.dto'
import { JwtService } from '@nestjs/jwt'
import { ClientMailService } from 'src/client-mail/client-mail.service'

@Injectable()
export class OrderService {
	private readonly logger = new Logger(OrderService.name)

	constructor(
		private readonly prismaService: PrismaService,
		private readonly jwtService: JwtService,
		private readonly mailService: ClientMailService
	) {}

	private async sendTelegramWithRetry(
		message: string,
		retries = 3
	): Promise<boolean> {
		const botToken = process.env.TELEGRAM_BOT_TOKEN
		const chatId = process.env.TELEGRAM_CHAT_ID

		if (!botToken || !chatId) {
			this.logger.error('TELEGRAM_BOT_TOKEN или TELEGRAM_CHAT_ID не заданы в .env')
			return false
		}

		const url = `https://api.telegram.org/bot${botToken}/sendMessage`

		for (let attempt = 1; attempt <= retries; attempt++) {
			try {
				const response = await fetch(url, {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ chat_id: chatId, text: message })
				})

				if (response.ok) return true

				const errorDetails = await response.json()
				this.logger.error(
					`Telegram попытка ${attempt}/${retries}: ${errorDetails.description}`
				)
			} catch (error) {
				this.logger.error(
					`Telegram попытка ${attempt}/${retries}: ${error.message}`
				)
			}

			if (attempt < retries) {
				await new Promise(r => setTimeout(r, 1000 * attempt))
			}
		}

		this.logger.error(
			`Не удалось отправить в Telegram после ${retries} попыток`
		)
		return false
	}

	private async sendOrderEmail(message: string): Promise<void> {
		try {
			await this.mailService.sendMail(
				'liniyavkusa.dostavka@mail.ru',
				'Новый заказ',
				`<pre>${message}</pre>`
			)
		} catch (error) {
			this.logger.error(`Ошибка отправки email: ${error.message}`)
		}
	}

	async createOrder(dto: CreateOrderDto, token: string) {
		const decoded = this.jwtService.verify(token)
		const accountId = decoded.id

		if (!accountId) throw new UnauthorizedException('Невалидный токен')

		if (!dto.items.length) {
			throw new BadRequestException('Корзина пуста')
		}

		// Проверка промокода (если есть)
		if (dto.promoCodeId) {
			const promoCode = await this.prismaService.promoCode.findUnique({
				where: { id: dto.promoCodeId }
			})

			if (!promoCode) {
				throw new BadRequestException('Промокод не найден')
			}

			if (promoCode.minPrice && dto.totalAmount < promoCode.minPrice) {
				throw new BadRequestException(
					`Минимальная сумма для применения промокода: ${promoCode.minPrice} ₽`
				)
			}

			const existingOrder = await this.prismaService.order.findFirst({
				where: {
					accountId: accountId,
					promoCodeId: dto.promoCodeId
				}
			})

			if (existingOrder) {
				throw new BadRequestException(
					'Вы уже использовали этот промокод'
				)
			}
		}

		// Ищем товары и в ProductDelivery, и в ProductCatering
		const productsDeliveryFromDb =
			await this.prismaService.productDelivery.findMany({
				where: {
					id: { in: dto.items.map(item => item.productId) }
				}
			})

		const productsCateringFromDb =
			await this.prismaService.productCatering.findMany({
				where: {
					id: { in: dto.items.map(item => item.productId) }
				}
			})

		const allProducts = [
			...productsDeliveryFromDb,
			...productsCateringFromDb
		]

		let order
		try {
			order = await this.prismaService.order.create({
				data: {
					accountId: accountId,
					promoCodeId: dto.promoCodeId || null,
					totalAmount: dto.totalAmount,
					items: {
						create: dto.items.map(item => {
							const product = allProducts.find(
								p => p.id === item.productId
							)

							if (!product) {
								throw new BadRequestException(
									`Товар с id ${item.productId} не найден`
								)
							}

							return {
								productId: item.productId,
								name: product.name,
								price: item.price,
								quantity: item.quantity
							}
						})
					}
				},
				include: {
					items: true
				}
			})
		} catch (error) {
			if (error instanceof BadRequestException) throw error
			this.logger.error(`Ошибка записи заказа в БД: ${error.message}`)
			throw new BadRequestException(
				'Не удалось сохранить заказ, свяжитесь по номеру: +7 (924) 805-33-55'
			)
		}

		// Формируем и отправляем сообщение в Telegram
		const cartDetails = order.items
			.map(item => `${item.name} — ${item.quantity} шт.`)
			.join('\n')

		const paymentText =
			dto.paymentMethod === 'cash'
				? 'Наличные'
				: dto.paymentMethod === 'card'
				? 'Картой'
				: 'Не выбрано'

		const deliveryText = dto.isDelivery
			? `Адрес: ${dto.address ?? '—'}\nДата и время: ${dto.deliveryOption ?? 'Сразу как будет готово'}`
			: 'Самовывоз'

		const message =
			`Новый заказ:\n\n` +
			`Товары:\n${cartDetails}\n` +
			`Имя: ${dto.name ?? '—'}\n` +
			`Телефон: ${dto.phone ?? '—'}\n` +
			`${deliveryText}\n` +
			`Вариант оплаты: ${paymentText}\n\n` +
			`Общая сумма: ${dto.totalAmount} ₽`

		// Отправляем на почту (бэкап) и в Telegram параллельно
		const [, telegramSent] = await Promise.all([
			this.sendOrderEmail(message),
			this.sendTelegramWithRetry(message)
		])

		if (!telegramSent) {
			throw new BadRequestException(
				'Ошибка отправки вашего заказа, свяжитесь по номеру: +7 (924) 805-33-55'
			)
		}

		return order
	}

	async getOrderHistory(token: string) {
		const decoded = this.jwtService.verify(token)
		const accountId = decoded.id

		if (!accountId) throw new UnauthorizedException('Невалидный токен')

		const orders = await this.prismaService.order.findMany({
			where: { accountId },
			include: {
				items: true,
				promoCode: {
					include: {
						products: true
					}
				}
			},
			orderBy: {
				createdAt: 'desc'
			}
		})

		return orders
	}
}
