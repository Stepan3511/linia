import {
	Controller,
	HttpCode,
	Post,
	Query,
	UploadedFile,
	UseInterceptors
} from '@nestjs/common'
import { FileService } from './file.service'
import { FileInterceptor } from '@nestjs/platform-express'
import { Auth } from 'src/auth/decorators/auth.decorator'

@Controller('file')
export class FileController {
	constructor(private readonly fileService: FileService) {}

	@Auth()
	@Post()
	@HttpCode(200)
	@UseInterceptors(FileInterceptor('image'))
	async saveFile(
		@UploadedFile() file: Express.Multer.File,
		@Query('folder') folder?: string
	) {
		return this.fileService.saveFile(file, folder)
	}
}
