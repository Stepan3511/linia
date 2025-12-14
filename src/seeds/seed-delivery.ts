import { PrismaClient } from '@prisma/client'
import * as fs from 'fs'

const prisma = new PrismaClient()

async function main() {
	const data = JSON.parse(fs.readFileSync('data_delivery.json', 'utf-8'))

	for (const category of data) {
		await prisma.categoryDelivery.create({
			data: {
				name: category.name,
				position: category.position,

				ProductDelivery: {
					create: category.products.map((product: any) => ({
						name: product.name,
						description: product.description,
						weight: product.weight,
						pieces: product.pieces,
						price: product.price,
						image: product.image || '/uploads/delivery/default.png',
						cateringCart: product.catering_cart,
						deliveryCart: product.delivery_cart
					}))
				}
			}
		})
	}
}

main()
	.catch(e => {
		console.error(e)
		process.exit(1)
	})
	.finally(async () => {
		await prisma.$disconnect()
	})
