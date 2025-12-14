import { PrismaClient } from '@prisma/client'
import * as fs from 'fs'

const prisma = new PrismaClient()

async function main() {
	const data = JSON.parse(fs.readFileSync('data_catering.json', 'utf-8'))

	for (const category of data) {
		await prisma.categoryCatering.create({
			data: {
				name: category.name,
				position: category.position,

				ProductCatering: {
					create: category.products.map((product: any) => ({
						name: product.name,
						description: product.description,
						weight: product.weight,
						price: product.price,
						minOrder: product.minOrder,
						image: product.image || '/uploads/catering/default.png'
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
