import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { CategoryCateringDto } from './dto/category-catering.dto'

@Injectable()
export class CategoryCateringService {
	constructor(private readonly prismaService: PrismaService) {}

	async getAll() {
		const product = await this.prismaService.categoryCatering.findMany({
			orderBy: {
				createdAt: 'desc'
			},
			include: {
				ProductCatering: true
			}
		})
		return product
	}

	async getById(id: string) {
		const product = await this.prismaService.categoryCatering.findUnique({
			where: {
				id
			},
			include: {
				ProductCatering: true
			}
		})
		if (!product) throw new NotFoundException('Категория не найдена')

		return product
	}

	async create(dto: CategoryCateringDto) {
		return this.prismaService.categoryCatering.create({
			data: {
				name: dto.name
			}
		})
	}

	async update(id: string, dto: CategoryCateringDto) {
		await this.getById(id)

		return this.prismaService.categoryCatering.update({
			where: { id },
			data: dto
		})
	}

	async delete(id: string) {
		await this.getById(id)

		return this.prismaService.categoryCatering.delete({
			where: { id }
		})
	}
}
