import { PrismaClient } from '@prisma/client'
import * as fs from 'fs'

const prisma = new PrismaClient()

async function main() {
	// Читаем JSON-файл
	const data = JSON.parse(fs.readFileSync('data_stories.json', 'utf-8'))

	for (const group of data) {
		await prisma.stories.create({
			data: {
				name: group.name.trim(),
				description: group.description || null,
				stories: {
					create: group.stories.map((story: { image: string }) => ({
						image:
							story.image || '/uploads/images/stories/default.png'
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
