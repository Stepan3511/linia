import { PrismaClient } from '@prisma/client'
import * as argon2 from 'argon2'

const prisma = new PrismaClient()

async function createAdmin() {
	const email = 'liniyvkusa@mail.ru'
	const name = 'Степан'
	const rawPassword = 'bX5wz5m4B'

	try {
		// Хэшируем пароль
		const hashedPassword = await argon2.hash(rawPassword)

		// Создаем администратора
		const admin = await prisma.user.create({
			data: {
				email,
				password: hashedPassword,
				name,
				role: 'ADMIN' // Роль ADMIN
			}
		})

		console.log('Администратор успешно создан:', admin)
	} catch (error) {
		console.error('Ошибка при создании администратора:', error)
	} finally {
		await prisma.$disconnect()
	}
}

createAdmin()
