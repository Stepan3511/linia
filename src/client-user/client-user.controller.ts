import { Controller, Get, Req, UnauthorizedException } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { JwtService } from '@nestjs/jwt'
import { Request } from 'express'
import { ClientUserService } from './client-user.service'

@Controller('client-user')
export class ClientUserController {
	constructor(
		private readonly prismaService: PrismaService,
		private readonly jwtService: JwtService,
		private readonly clientUserService: ClientUserService
	) {}

	@Get('profile')
	async getProfile(@Req() req: Request) {
		const token = req.headers['authorization']?.split(' ')[1]

		if (!token) {
			throw new UnauthorizedException('Токен не предоставлен')
		}

		try {
			const decoded = this.jwtService.verify(token)

			const userId = decoded.id
			if (!userId) {
				throw new UnauthorizedException('Невалидный токен')
			}

			const user = await this.prismaService.accounts.findUnique({
				where: { id: userId }
			})

			if (!user) {
				throw new UnauthorizedException('Пользователь не найден')
			}

			return { email: user.email }
		} catch (error) {
			throw new UnauthorizedException('Невалидный токен')
		}
	}

	@Get('all-users')
	async getAllUsers() {
		return this.clientUserService.getAllUsers()
	}
}
