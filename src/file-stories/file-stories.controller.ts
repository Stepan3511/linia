import {
	Controller,
	HttpCode,
	Post,
	Query,
	UploadedFile,
	UseInterceptors
} from '@nestjs/common'
import { FileStoriesService } from './file-stories.service'
import { FileInterceptor } from '@nestjs/platform-express'
import { Auth } from 'src/auth/decorators/auth.decorator'

@Controller('file-stories')
export class FileStoriesController {
	constructor(private readonly fileStoriesService: FileStoriesService) {}

	@Auth()
	@Post()
	@HttpCode(200)
	@UseInterceptors(FileInterceptor('image'))
	async saveFile(
		@UploadedFile() file: Express.Multer.File,
		@Query('folder') folder?: string
	) {
		return this.fileStoriesService.saveFile(file, folder)
	}
}
