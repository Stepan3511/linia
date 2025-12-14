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
import { WorkTimeService } from './work-time.service'
import { WorkTimeDto } from './dto/work-time.dto'
import { Auth } from 'src/auth/decorators/auth.decorator'

@Controller('work-time')
export class WorkTimeController {
	constructor(private readonly workTimeService: WorkTimeService) {}

	@Get()
	async getAll() {
		return this.workTimeService.getAll()
	}

	@Get('by-id/:id')
	async getById(@Param('id') id: string) {
		return this.workTimeService.getById(id)
	}

	@Auth()
	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post()
	async create(@Body() dto: WorkTimeDto) {
		return await this.workTimeService.create(dto)
	}

	@Auth()
	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Patch(':id')
	async update(@Param('id') id: string, @Body() dto: WorkTimeDto) {
		return this.workTimeService.update(id, dto)
	}

	@Auth()
	@HttpCode(200)
	@Delete(':id')
	async delete(@Param('id') id: string) {
		return this.workTimeService.delete(id)
	}
}
