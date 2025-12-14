import { Module } from '@nestjs/common'
import { ClientAuthController } from './client-auth.controller'
import { ClientAuthService } from './client-auth.service'
import { PrismaService } from '../prisma.service'
import { JwtModule } from '@nestjs/jwt'
import { ClientOtpEmailService } from 'src/client-otp-email/client-otp-email.service'
import { ClientMailModule } from 'src/client-mail/client-mail.module'

@Module({
	imports: [
		JwtModule.register({
			secret: process.env.JWT_SECRET
			// signOptions: { expiresIn: '1h' }
		}),
		ClientMailModule
	],
	controllers: [ClientAuthController],
	providers: [ClientAuthService, ClientOtpEmailService, PrismaService]
})
export class ClientAuthModule {}
