import { Controller, Post, Body } from '@nestjs/common'
import { ClientOtpEmailService } from './client-otp-email.service'

@Controller('client-auth')
export class ClientOtpEmailController {
	constructor(
		private readonly clientOtpEmailService: ClientOtpEmailService
	) {}

	@Post('send-otp')
	async sendOtp(@Body('email') email: string) {
		return this.clientOtpEmailService.sendOtp(email)
	}
}
