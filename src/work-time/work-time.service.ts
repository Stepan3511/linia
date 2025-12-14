import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { WorkTimeDto } from './dto/work-time.dto'

@Injectable()
export class WorkTimeService {
	constructor(private readonly prismaService: PrismaService) {}

	async getAll() {
		const product = await this.prismaService.workTime.findMany()
		return product
	}

	async getById(id: string) {
		const product = await this.prismaService.workTime.findUnique({
			where: {
				id
			}
		})
		if (!product) throw new NotFoundException('Work Time не найдено')

		return product
	}

	async create(dto: WorkTimeDto) {
		return this.prismaService.workTime.create({
			data: {
				from: dto.from,
				to: dto.to,
				message: dto.message
			}
		})
	}

	async update(id: string, dto: WorkTimeDto) {
		await this.getById(id)

		return this.prismaService.workTime.update({
			where: { id },
			data: dto
		})
	}

	async delete(id: string) {
		await this.getById(id)

		return this.prismaService.workTime.delete({
			where: { id }
		})
	}
}
