import { Injectable } from '@nestjs/common'
import { addMinutes, isBefore } from 'date-fns'
import { PrismaService } from '../prisma.service'
import { ClientMailService } from '../client-mail/client-mail.service'

@Injectable()
export class ClientOtpEmailService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly clientMailService: ClientMailService
	) {}

	async sendOtp(email: string): Promise<string> {
		const otp = Math.floor(100000 + Math.random() * 900000)
		const expiresAt = Math.floor(
			addMinutes(new Date(), 15).getTime() / 1000
		)

		await this.prisma.accounts.upsert({
			where: { email },
			update: { otp, expiresAt },
			create: { email, otp, expiresAt }
		})

		await this.clientMailService.sendMail(
			email,
			'Код для входа',
			`<p>Ваш код: <b>${otp}</b></p><p>Он действителен 15 минут.</p>`
		)

		return 'Код отправлен на почту'
	}

	async verifyOtp(email: string, otp: number): Promise<boolean> {
		const account = await this.prisma.accounts.findUnique({
			where: { email }
		})

		if (!account) return false

		if (isBefore(new Date(), new Date(account.expiresAt! * 1000))) {
			return account.otp === otp
		}

		await this.prisma.accounts.update({
			where: { email },
			data: { otp: null, expiresAt: null }
		})

		return false
	}
}
