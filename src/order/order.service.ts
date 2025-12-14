import {
	BadRequestException,
	Injectable,
	UnauthorizedException
} from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { CreateOrderDto } from './dto/create-order.dto'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class OrderService {
	constructor(
		private readonly prismaService: PrismaService,
		private readonly jwtService: JwtService
	) {}

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

		const order = await this.prismaService.order.create({
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
						products: true // ✅ ← ДОБАВЬ ЭТО!
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
