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
import { ProductCateringService } from './product-catering.service'
import { ProductCateringDto } from './dto/product-catering.dto'
import { Auth } from 'src/auth/decorators/auth.decorator'

@Controller('catering')
export class ProductCateringController {
	constructor(
		private readonly productCateringService: ProductCateringService
	) {}

	@Get()
	async getAll() {
		return this.productCateringService.getAll()
	}

	@Get('by-id/:id')
	async getById(@Param('id') id: string) {
		return this.productCateringService.getById(id)
	}

	@Get('by-category/:categoryId')
	async getByCategory(@Param('categoryId') categoryId: string) {
		return this.productCateringService.getByCategory(categoryId)
	}

	@Auth()
	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post()
	async create(@Body() dto: ProductCateringDto) {
		return await this.productCateringService.create(dto)
	}

	@Auth()
	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Patch(':id')
	async update(@Param('id') id: string, @Body() dto: ProductCateringDto) {
		return this.productCateringService.update(id, dto)
	}

	@Auth()
	@HttpCode(200)
	@Delete(':id')
	async delete(@Param('id') id: string) {
		return this.productCateringService.delete(id)
	}
}
