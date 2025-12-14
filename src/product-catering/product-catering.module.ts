import { Module } from '@nestjs/common'
import { ProductCateringService } from './product-catering.service'
import { ProductCateringController } from './product-catering.controller'
import { PrismaService } from 'src/prisma.service'

@Module({
	controllers: [ProductCateringController],
	providers: [ProductCateringService, PrismaService]
})
export class ProductCateringModule {}
