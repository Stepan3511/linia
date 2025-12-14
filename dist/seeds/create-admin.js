"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const argon2 = require("argon2");
const prisma = new client_1.PrismaClient();
async function createAdmin() {
    const email = 'liniyvkusa@mail.ru';
    const name = 'Степан';
    const rawPassword = 'bX5wz5m4B';
    try {
        const hashedPassword = await argon2.hash(rawPassword);
        const admin = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                name,
                role: 'ADMIN'
            }
        });
        console.log('Администратор успешно создан:', admin);
    }
    catch (error) {
        console.error('Ошибка при создании администратора:', error);
    }
    finally {
        await prisma.$disconnect();
    }
}
createAdmin();
//# sourceMappingURL=create-admin.js.map