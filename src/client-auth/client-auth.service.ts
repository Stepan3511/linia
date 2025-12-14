import { Injectable, Logger, UnauthorizedException } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { JwtService } from '@nestjs/jwt'
import { ClientOtpEmailService } from '../client-otp-email/client-otp-email.service'

@Injectable()
export class ClientAuthService {
	private readonly revokedTokens = new Set<string>()
	private readonly logger = new Logger(ClientAuthService.name)

	constructor(
		private readonly clentOtpEmailService: ClientOtpEmailService,
		private readonly prismaService: PrismaService,
		private readonly jwtService: JwtService
	) {}

	async login(email: string, otp: number): Promise<any> {
		const isValid = await this.clentOtpEmailService.verifyOtp(email, otp)
		if (!isValid) {
			throw new UnauthorizedException('Неверный код')
		}

		const account = await this.prismaService.accounts.findUnique({
			where: { email }
		})

		if (!account) {
			throw new UnauthorizedException('Пользователь не найден')
		}

		const { accessToken, refreshToken } = this.issueTokens(account.id)

		return {
			account: {
				id: account.id,
				createdAt: account.createdAt,
				updatedAt: account.updatedAt,
				email: account.email
			},
			accessToken,
			refreshToken
		}
	}

	async refreshTokens(refreshToken: string) {
		if (this.revokedTokens.has(refreshToken)) {
			throw new UnauthorizedException('Refresh токен аннулирован')
		}

		let decoded: any

		try {
			decoded = await this.jwtService.verifyAsync(refreshToken)
		} catch (error) {
			this.logger.warn('Невалидный refresh токен', error)
			throw new UnauthorizedException('Невалидный refresh токен')
		}

		if (!decoded || typeof decoded !== 'object' || !decoded.id) {
			this.logger.error('decoded токен не содержит ID', decoded)
			throw new UnauthorizedException('Refresh токен не содержит ID')
		}

		const user = await this.prismaService.accounts.findUnique({
			where: { id: decoded.id }
		})

		if (!user) {
			this.logger.warn(`Пользователь с ID ${decoded.id} не найден`)
			throw new UnauthorizedException('Пользователь не найден')
		}

		const tokens = this.issueTokens(user.id)

		this.logger.log(
			`Токены успешно обновлены для пользователя ID: ${user.id}`
		)

		return tokens
	}

	async logout(refreshToken: string) {
		this.revokedTokens.add(refreshToken)
		this.logger.log(`Refresh токен отозван: ${refreshToken}`)
		return { message: 'Выход выполнен' }
	}

	private issueTokens(userId: string) {
		const payload = { id: userId }

		const accessToken = this.jwtService.sign(payload, { expiresIn: '1h' })
		const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' })

		return { accessToken, refreshToken }
	}
}
