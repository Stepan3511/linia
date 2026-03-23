// src/order/order.module.ts

import { Module } from '@nestjs/common'
import { OrderController } from './order.controller'
import { OrderService } from './order.service'
import { PrismaService } from 'src/prisma.service'
import { JwtModule } from '@nestjs/jwt'
import { ClientMailModule } from 'src/client-mail/client-mail.module'

@Module({
	imports: [
		JwtModule.register({
			secret: process.env.JWT_SECRET,
			signOptions: { expiresIn: '1h' }
		}),
		ClientMailModule
	],
	controllers: [OrderController],
	providers: [OrderService, PrismaService]
})
export class OrderModule {}
