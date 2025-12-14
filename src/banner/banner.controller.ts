import {
	Body,
	Controller,
	Get,
	HttpCode,
	Patch,
	Post,
	Put,
	UploadedFile,
	UseInterceptors
} from '@nestjs/common'
import { BannerService } from './banner.service'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { IBannerDto } from './banner.interface'
import { FileInterceptor } from '@nestjs/platform-express'

@Controller('banner')
export class BannerController {
	constructor(private readonly bannerService: BannerService) {}

	@Get()
	async getBanner() {
		return this.bannerService.getBanner()
	}

	@Auth()
	@Put()
	@HttpCode(200)
	async updateBanner(@Body() dto: IBannerDto) {
		return this.bannerService.updateBanner(dto)
	}

	@Auth()
	@Patch()
	@HttpCode(200)
	async patchBanner(@Body() dto: IBannerDto) {
		return this.bannerService.updateBanner(dto)
	}

	@Auth()
	@Post('upload-image')
	@HttpCode(200)
	@UseInterceptors(FileInterceptor('file'))
	async uploadImage(@UploadedFile() file: Express.Multer.File) {
		return this.bannerService.uploadImage(file)
	}
}
