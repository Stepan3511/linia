import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { ProductCateringDto } from './dto/product-catering.dto'

@Injectable()
export class ProductCateringService {
	constructor(private readonly prismaService: PrismaService) {}

	async getAll() {
		const product = await this.prismaService.productCatering.findMany({
			orderBy: {
				createdAt: 'desc'
			},
			include: {
				category: true
			}
		})
		return product
	}

	async getById(id: string) {
		const product = await this.prismaService.productCatering.findUnique({
			where: {
				id
			},
			include: {
				category: true
			}
		})
		if (!product) throw new NotFoundException('Товар не найден')

		return product
	}

	async getByCategory(categoryId: string) {
		const products = await this.prismaService.productCatering.findMany({
			where: {
				category: {
					id: categoryId
				}
			},
			include: {
				category: true
			}
		})
		if (!products) throw new NotFoundException('Товары не найдены')

		return products
	}

	async create(dto: ProductCateringDto) {
		return this.prismaService.productCatering.create({
			data: {
				name: dto.name,
				description: dto.description,
				weight: dto.weight,
				price: dto.price,
				image: dto.image,
				categoryId: dto.categoryId,
				cateringCart: dto.cateringCart,
				deliveryCart: dto.deliveryCart
			}
		})
	}

	async update(id: string, dto: ProductCateringDto) {
		await this.getById(id)

		return this.prismaService.productCatering.update({
			where: { id },
			data: dto
		})
	}

	async delete(id: string) {
		await this.getById(id)

		return this.prismaService.productCatering.delete({
			where: { id }
		})
	}
}
