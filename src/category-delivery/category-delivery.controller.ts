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
	ValidationPipe
} from '@nestjs/common'
import { CategoryDeliveryService } from './category-delivery.service'
import { CategoryDeliveryDto } from './dto/category-delivery.dto'
import { Auth } from 'src/auth/decorators/auth.decorator'

@Controller('category-delivery')
export class CategoryDeliveryController {
	constructor(
		private readonly categoryDeliveryService: CategoryDeliveryService
	) {}

	@Get()
	async getAll() {
		return this.categoryDeliveryService.getAll()
	}

	@Get('by-id/:id')
	async getById(@Param('id') id: string) {
		return this.categoryDeliveryService.getById(id)
	}

	@Auth()
	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post()
	async create(@Body() dto: CategoryDeliveryDto) {
		return await this.categoryDeliveryService.create(dto)
	}

	@Auth()
	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Patch(':id')
	async update(@Param('id') id: string, @Body() dto: CategoryDeliveryDto) {
		return this.categoryDeliveryService.update(id, dto)
	}

	@Auth()
	@HttpCode(200)
	@Delete(':id')
	async delete(@Param('id') id: string) {
		return this.categoryDeliveryService.delete(id)
	}
}
