import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	Post,
	Patch,
	UsePipes,
	ValidationPipe,
	UseGuards
} from '@nestjs/common'
import { CategoryCateringService } from './category-catering.service'
import { CategoryCateringDto } from './dto/category-catering.dto'
import { Auth } from 'src/auth/decorators/auth.decorator'

@Controller('category-catering')
export class CategoryCateringController {
	constructor(
		private readonly categoryCateringService: CategoryCateringService
	) {}

	@Get()
	async getAll() {
		return this.categoryCateringService.getAll()
	}

	@Get('by-id/:id')
	async getById(@Param('id') id: string) {
		return this.categoryCateringService.getById(id)
	}

	@Auth()
	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post()
	async create(@Body() dto: CategoryCateringDto) {
		return await this.categoryCateringService.create(dto)
	}

	@Auth()
	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Patch(':id')
	async update(@Param('id') id: string, @Body() dto: CategoryCateringDto) {
		return this.categoryCateringService.update(id, dto)
	}

	@Auth()
	@HttpCode(200)
	@Delete(':id')
	async delete(@Param('id') id: string) {
		return this.categoryCateringService.delete(id)
	}
}
