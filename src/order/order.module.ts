// src/order/order.module.ts

import { Module } from '@nestjs/common'
import { OrderController } from './order.controller'
import { OrderService } from './order.service'
import { PrismaService } from 'src/prisma.service'
import { JwtModule } from '@nestjs/jwt'

@Module({
	imports: [
		JwtModule.register({
			secret: process.env.JWT_SECRET,
			signOptions: { expiresIn: '1h' }
		})
	],
	controllers: [OrderController],
	providers: [OrderService, PrismaService]
})
export class OrderModule {}
