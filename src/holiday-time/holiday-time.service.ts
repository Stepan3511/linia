import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { HolidayTimeDto } from './dto/holiday-time.dto'

@Injectable()
export class HolidayTimeService {
	constructor(private readonly prismaService: PrismaService) {}

	async getAll() {
		const product = await this.prismaService.holidayTime.findMany()
		return product
	}

	async getById(id: string) {
		const product = await this.prismaService.holidayTime.findUnique({
			where: {
				id
			}
		})
		if (!product) throw new NotFoundException('Holiday Time не найдено')

		return product
	}

	async create(dto: HolidayTimeDto) {
		return this.prismaService.holidayTime.create({
			data: {
				from: dto.from,
				to: dto.to,
				message: dto.message
			}
		})
	}

	async update(id: string, dto: HolidayTimeDto) {
		await this.getById(id)

		return this.prismaService.holidayTime.update({
			where: { id },
			data: dto
		})
	}

	async delete(id: string) {
		await this.getById(id)

		return this.prismaService.holidayTime.delete({
			where: { id }
		})
	}
}
