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
import { ProductDeliveryService } from './product-delivery.service'
import { ProductDeliveryDto } from './dto/product-delivery.dto'
import { Auth } from 'src/auth/decorators/auth.decorator'

@Controller('delivery')
export class ProductDeliveryController {
	constructor(
		private readonly productDeliveryService: ProductDeliveryService
	) {}

	@Get()
	async getAll() {
		return this.productDeliveryService.getAll()
	}

	@Get('by-id/:id')
	async getById(@Param('id') id: string) {
		return this.productDeliveryService.getById(id)
	}

	@Get('by-category/:categoryId')
	async getByCategory(@Param('categoryId') categoryId: string) {
		return this.productDeliveryService.getByCategory(categoryId)
	}

	@Auth()
	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post()
	async create(@Body() dto: ProductDeliveryDto) {
		return await this.productDeliveryService.create(dto)
	}

	@Auth()
	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Patch(':id')
	async update(@Param('id') id: string, @Body() dto: ProductDeliveryDto) {
		return this.productDeliveryService.update(id, dto)
	}

	@Auth()
	@HttpCode(200)
	@Delete(':id')
	async delete(@Param('id') id: string) {
		return this.productDeliveryService.delete(id)
	}
}
