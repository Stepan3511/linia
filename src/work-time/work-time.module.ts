import { Module } from '@nestjs/common'
import { WorkTimeService } from './work-time.service'
import { WorkTimeController } from './work-time.controller'
import { PrismaService } from 'src/prisma.service'

@Module({
	controllers: [WorkTimeController],
	providers: [WorkTimeService, PrismaService]
})
export class workTimeModule {}
