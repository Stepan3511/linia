import { Module } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { StoriesService } from './stories.service'
import { StoriesController } from './stories.controller'

@Module({
	controllers: [StoriesController],
	providers: [StoriesService, PrismaService]
})
export class StoriesModule {}
