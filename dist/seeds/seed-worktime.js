"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function createAdmin() {
    const from = '10:00';
    const to = '22:00';
    const message = 'Вы можете заказать сейчас, но заказ будет обработан в рабочее время';
    try {
        const worktime = await prisma.workTime.create({
            data: {
                from,
                to,
                message
            }
        });
        console.log('Расписание успешно создано:', worktime);
    }
    catch (error) {
        console.error('Ошибка при создании расписания:', error);
    }
    finally {
        await prisma.$disconnect();
    }
}
createAdmin();
//# sourceMappingURL=seed-worktime.js.map