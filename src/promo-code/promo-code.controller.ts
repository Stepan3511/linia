import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	Patch,
	Post,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import { PromoCodeService } from './promo-code.service'
import { PromoCodeDto } from './dto/promo-code.dto'
import { Auth } from 'src/auth/decorators/auth.decorator'

@Controller('promo-code')
export class PromoCodeController {
	constructor(private readonly promoCodeService: PromoCodeService) {}

	@Get()
	async getAll() {
		return this.promoCodeService.getAll()
	}

	@Get('by-id/:id')
	async getById(@Param('id') id: string) {
		return this.promoCodeService.getById(id)
	}

	@Auth()
	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post()
	async create(@Body() dto: PromoCodeDto) {
		return this.promoCodeService.create(dto)
	}

	@Auth()
	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Patch(':id')
	async update(@Param('id') id: string, @Body() dto: PromoCodeDto) {
		return this.promoCodeService.update(id, dto)
	}

	@Auth()
	@HttpCode(200)
	@Delete(':id')
	async delete(@Param('id') id: string) {
		return this.promoCodeService.delete(id)
	}

	@Auth()
	@Patch('archive/:id')
	async archive(@Param('id') id: string) {
		return this.promoCodeService.archive(id)
	}

	@Auth()
	@Get('archived')
	async getArchived() {
		return this.promoCodeService.getArchived()
	}

	@Auth()
	@HttpCode(200)
	@Post(':id/restore')
	async restore(@Param('id') id: string) {
		return this.promoCodeService.restoreFromArchive(id)
	}
}
