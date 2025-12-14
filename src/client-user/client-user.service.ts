import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'

@Injectable()
export class ClientUserService {
	constructor(private readonly prismaService: PrismaService) {}

	async getUserById(userId: string) {
		const user = await this.prismaService.accounts.findUnique({
			where: { id: userId }
		})

		if (!user) {
			throw new Error('Пользователь не найден')
		}

		return { email: user.email }
	}

	async getAllUsers() {
		const users = await this.prismaService.accounts.findMany({
			include: {
				orders: {
					include: {
						promoCode: true
					}
				}
			}
		})

		return users.map(user => ({
			id: user.id,
			email: user.email,
			promoCodesUsed: user.orders
				.filter(order => order.promoCode !== null)
				.map(order => ({
					promoCodeId: order.promoCode!.id,
					promoCodeName: order.promoCode!.name
				}))
		}))
	}
}
