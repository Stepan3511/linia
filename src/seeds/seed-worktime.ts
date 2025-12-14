import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function createAdmin() {
	const from = '10:00'
	const to = '22:00'
	const message =
		'Вы можете заказать сейчас, но заказ будет обработан в рабочее время'

	try {
		// Создаем администратора
		const worktime = await prisma.workTime.create({
			data: {
				from,
				to,
				message
			}
		})

		console.log('Расписание успешно создано:', worktime)
	} catch (error) {
		console.error('Ошибка при создании расписания:', error)
	} finally {
		await prisma.$disconnect()
	}
}

createAdmin()
