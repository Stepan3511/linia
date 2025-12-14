import { Module } from '@nestjs/common'
import { MailerModule } from '@nestjs-modules/mailer'
import { ConfigModule, ConfigService } from '@nestjs/config'

import { getMailerConfig } from '../config/mailer.config'
import { ClientMailService } from './client-mail.service'

@Module({
	imports: [
		MailerModule.forRootAsync({
			imports: [ConfigModule],
			useFactory: getMailerConfig,
			inject: [ConfigService]
		})
	],
	providers: [ClientMailService],
	exports: [ClientMailService]
})
export class ClientMailModule {}
