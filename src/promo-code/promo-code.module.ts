import { Module } from '@nestjs/common'
import { PromoCodeService } from './promo-code.service'
import { PromoCodeController } from './promo-code.controller'
import { PrismaService } from 'src/prisma.service'

@Module({
	controllers: [PromoCodeController],
	providers: [PromoCodeService, PrismaService]
})
export class promoCodeModule {}
