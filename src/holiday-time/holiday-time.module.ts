import { Module } from '@nestjs/common'
import { HolidayTimeService } from './holiday-time.service'
import { HolidayTimeController } from './holiday-time.controller'
import { PrismaService } from 'src/prisma.service'

@Module({
	controllers: [HolidayTimeController],
	providers: [HolidayTimeService, PrismaService]
})
export class holidayTimeModule {}
