import { Module } from '@nestjs/common'
import { ClientOtpEmailService } from './client-otp-email.service'
import { ClientOtpEmailController } from './client-otp-email.controller'
import { PrismaService } from '../prisma.service'
import { ClientMailModule } from '../client-mail/client-mail.module'

@Module({
	imports: [ClientMailModule],
	controllers: [ClientOtpEmailController],
	providers: [ClientOtpEmailService, PrismaService],
	exports: [ClientOtpEmailService]
})
export class ClientOtpEmailModule {}
