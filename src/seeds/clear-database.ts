import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function clearDatabase() {
	try {
		await prisma.productDelivery.deleteMany()
		await prisma.productCatering.deleteMany()
		await prisma.categoryDelivery.deleteMany()
		await prisma.categoryCatering.deleteMany()
		await prisma.stories.deleteMany()
		await prisma.story.deleteMany()
		await prisma.user.deleteMany()
		await prisma.holidayTime.deleteMany()
		await prisma.orderItem.deleteMany()
		await prisma.order.deleteMany()
		await prisma.promoCode.deleteMany()
		await prisma.workTime.deleteMany()
		await prisma.accounts.deleteMany()

		console.log('Все данные успешно удалены.')
	} catch (error) {
		console.error('Ошибка при очистке данных:', error)
	} finally {
		await prisma.$disconnect()
	}
}

clearDatabase()
