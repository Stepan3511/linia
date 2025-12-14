import { Module } from '@nestjs/common'
import { CategoryCateringService } from './category-catering.service'
import { CategoryCateringController } from './category-catering.controller'
import { PrismaService } from 'src/prisma.service'

@Module({
	controllers: [CategoryCateringController],
	providers: [CategoryCateringService, PrismaService]
})
export class CategoryCateringModule {}
