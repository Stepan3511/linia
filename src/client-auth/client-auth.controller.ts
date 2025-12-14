import { Controller, Post, Body } from '@nestjs/common'
import { ClientAuthService } from './client-auth.service'

@Controller('client-auth')
export class ClientAuthController {
	constructor(private readonly clientAuthService: ClientAuthService) {}

	@Post('login')
	async login(@Body('email') email: string, @Body('otp') otp: number) {
		return this.clientAuthService.login(email, otp)
	}

	@Post('refresh-tokens')
	async refreshTokens(@Body('refreshToken') refreshToken: string) {
		return this.clientAuthService.refreshTokens(refreshToken)
	}

	@Post('logout')
	async logout(@Body('refreshToken') refreshToken: string) {
		return this.clientAuthService.logout(refreshToken)
	}
}
