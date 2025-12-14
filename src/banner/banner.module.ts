import { Module } from '@nestjs/common'
import { BannerController } from './banner.controller'
import { BannerService } from './banner.service'
import { PrismaService } from 'src/prisma.service'
import { FileService } from 'src/file/file.service'

@Module({
	controllers: [BannerController],
	providers: [BannerService, PrismaService, FileService]
})
export class BannerModule {}
