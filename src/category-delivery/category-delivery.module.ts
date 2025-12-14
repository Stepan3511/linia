import { Module } from '@nestjs/common'
import { CategoryDeliveryService } from './category-delivery.service'
import { CategoryDeliveryController } from './category-delivery.controller'
import { PrismaService } from 'src/prisma.service'

@Module({
	controllers: [CategoryDeliveryController],
	providers: [CategoryDeliveryService, PrismaService]
})
export class CategoryDeliveryModule {}
