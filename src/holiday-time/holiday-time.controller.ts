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
import { HolidayTimeService } from './holiday-time.service'
import { HolidayTimeDto } from './dto/holiday-time.dto'
import { Auth } from 'src/auth/decorators/auth.decorator'

@Controller('holiday-time')
export class HolidayTimeController {
	constructor(private readonly holidayTimeService: HolidayTimeService) {}

	@Get()
	async getAll() {
		return this.holidayTimeService.getAll()
	}

	@Get('by-id/:id')
	async getById(@Param('id') id: string) {
		return this.holidayTimeService.getById(id)
	}

	@Auth()
	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post()
	async create(@Body() dto: HolidayTimeDto) {
		return await this.holidayTimeService.create(dto)
	}

	@Auth()
	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Patch(':id')
	async update(@Param('id') id: string, @Body() dto: HolidayTimeDto) {
		return this.holidayTimeService.update(id, dto)
	}

	@Auth()
	@HttpCode(200)
	@Delete(':id')
	async delete(@Param('id') id: string) {
		return this.holidayTimeService.delete(id)
	}
}
