import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { CategoryDeliveryDto } from './dto/category-delivery.dto'

@Injectable()
export class CategoryDeliveryService {
	constructor(private readonly prismaService: PrismaService) {}

	async getAll() {
		const product = await this.prismaService.categoryDelivery.findMany({
			orderBy: {
				createdAt: 'desc'
			},
			include: {
				ProductDelivery: true
			}
		})
		return product
	}

	async getById(id: string) {
		const product = await this.prismaService.categoryDelivery.findUnique({
			where: {
				id
			},
			include: {
				ProductDelivery: true
			}
		})
		if (!product) throw new NotFoundException('Категория не найдена')

		return product
	}

	async create(dto: CategoryDeliveryDto) {
		return this.prismaService.categoryDelivery.create({
			data: {
				name: dto.name
			}
		})
	}

	async update(id: string, dto: CategoryDeliveryDto) {
		await this.getById(id)

		return this.prismaService.categoryDelivery.update({
			where: { id },
			data: dto
		})
	}

	async delete(id: string) {
		await this.getById(id)

		return this.prismaService.categoryDelivery.delete({
			where: { id }
		})
	}
}
