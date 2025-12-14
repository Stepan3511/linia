import { Module } from '@nestjs/common'
import { ProductDeliveryService } from './product-delivery.service'
import { ProductDeliveryController } from './product-delivery.controller'
import { PrismaService } from 'src/prisma.service'

@Module({
	controllers: [ProductDeliveryController],
	providers: [ProductDeliveryService, PrismaService]
})
export class ProductDeliveryModule {}
