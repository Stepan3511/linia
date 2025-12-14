import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { PromoCodeDto } from './dto/promo-code.dto'

@Injectable()
export class PromoCodeService {
	constructor(private readonly prismaService: PrismaService) {}

	async getAll() {
		return this.prismaService.promoCode.findMany({
			where: {
				isArchive: false
			},
			include: {
				products: true
			}
		})
	}

	async getById(id: string) {
		const promoCode = await this.prismaService.promoCode.findUnique({
			where: { id },
			include: {
				products: true
			}
		})

		if (!promoCode) throw new NotFoundException('Promo Code не найден')
		return promoCode
	}

	async create(dto: PromoCodeDto) {
		const promoCode = await this.prismaService.promoCode.create({
			data: {
				name: dto.name,
				minPrice: dto.minPrice ? parseFloat(dto.minPrice) : undefined, // конвертируем строку в число
				products: dto.productIds?.length
					? {
							connect: dto.productIds.map(id => ({ id }))
						}
					: undefined
			},
			include: {
				products: true
			}
		})

		return promoCode
	}

	async update(id: string, dto: PromoCodeDto) {
		await this.getById(id)

		const updatedPromo = await this.prismaService.promoCode.update({
			where: { id },
			data: {
				name: dto.name,
				minPrice: dto.minPrice ? parseFloat(dto.minPrice) : undefined,
				products: {
					set: [],
					connect: dto.productIds?.length
						? dto.productIds.map(id => ({ id }))
						: undefined
				}
			},
			include: {
				products: true
			}
		})

		return updatedPromo
	}

	async delete(id: string) {
		await this.getById(id)

		await this.prismaService.promoCode.update({
			where: { id },
			data: {
				products: {
					set: []
				}
			}
		})

		return this.prismaService.promoCode.delete({
			where: { id }
		})
	}

	async archive(id: string) {
		const promoCode = await this.prismaService.promoCode.findUnique({
			where: { id }
		})

		if (!promoCode) {
			throw new NotFoundException('Promo Code не найден')
		}

		const updated = await this.prismaService.promoCode.update({
			where: { id },
			data: {
				isArchive: true
			}
		})

		return updated
	}

	async getArchived() {
		return this.prismaService.promoCode.findMany({
			where: {
				isArchive: true
			},
			include: {
				products: true
			}
		})
	}

	async restoreFromArchive(id: string) {
		return this.prismaService.promoCode.update({
			where: { id },
			data: { isArchive: false }
		})
	}
}
