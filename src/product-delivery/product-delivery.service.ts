import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { ProductDeliveryDto } from './dto/product-delivery.dto'

@Injectable()
export class ProductDeliveryService {
	constructor(private readonly prismaService: PrismaService) {}

	async getAll() {
		const product = await this.prismaService.productDelivery.findMany({
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
		const product = await this.prismaService.productDelivery.findUnique({
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
		const products = await this.prismaService.productDelivery.findMany({
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

	async create(dto: ProductDeliveryDto) {
		return this.prismaService.productDelivery.create({
			data: {
				name: dto.name,
				description: dto.description,
				weight: dto.weight,
				pieces: dto.pieces,
				price: dto.price,
				image: dto.image,
				categoryId: dto.categoryId,
				cateringCart: dto.cateringCart,
				deliveryCart: dto.deliveryCart
			}
		})
	}

	async update(id: string, dto: ProductDeliveryDto) {
		await this.getById(id)

		return this.prismaService.productDelivery.update({
			where: { id },
			data: dto
		})
	}

	async delete(id: string) {
		await this.getById(id)

		return this.prismaService.productDelivery.delete({
			where: { id }
		})
	}
}
