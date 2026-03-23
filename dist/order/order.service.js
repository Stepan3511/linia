"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var OrderService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
const jwt_1 = require("@nestjs/jwt");
const client_mail_service_1 = require("../client-mail/client-mail.service");
let OrderService = OrderService_1 = class OrderService {
    constructor(prismaService, jwtService, mailService) {
        this.prismaService = prismaService;
        this.jwtService = jwtService;
        this.mailService = mailService;
        this.logger = new common_1.Logger(OrderService_1.name);
    }
    async sendTelegramWithRetry(message, retries = 3) {
        const botToken = process.env.TELEGRAM_BOT_TOKEN;
        const chatId = process.env.TELEGRAM_CHAT_ID;
        if (!botToken || !chatId) {
            this.logger.error('TELEGRAM_BOT_TOKEN или TELEGRAM_CHAT_ID не заданы в .env');
            return false;
        }
        const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
        for (let attempt = 1; attempt <= retries; attempt++) {
            try {
                const response = await fetch(url, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ chat_id: chatId, text: message })
                });
                if (response.ok)
                    return true;
                const errorDetails = await response.json();
                this.logger.error(`Telegram попытка ${attempt}/${retries}: ${errorDetails.description}`);
            }
            catch (error) {
                this.logger.error(`Telegram попытка ${attempt}/${retries}: ${error.message}`);
            }
            if (attempt < retries) {
                await new Promise(r => setTimeout(r, 1000 * attempt));
            }
        }
        this.logger.error(`Не удалось отправить в Telegram после ${retries} попыток`);
        return false;
    }
    async sendOrderEmail(message) {
        try {
            await this.mailService.sendMail('liniyavkusa.dostavka@mail.ru', 'Новый заказ', `<pre>${message}</pre>`);
        }
        catch (error) {
            this.logger.error(`Ошибка отправки email: ${error.message}`);
        }
    }
    async createOrder(dto, token) {
        const decoded = this.jwtService.verify(token);
        const accountId = decoded.id;
        if (!accountId)
            throw new common_1.UnauthorizedException('Невалидный токен');
        if (!dto.items.length) {
            throw new common_1.BadRequestException('Корзина пуста');
        }
        if (dto.promoCodeId) {
            const promoCode = await this.prismaService.promoCode.findUnique({
                where: { id: dto.promoCodeId }
            });
            if (!promoCode) {
                throw new common_1.BadRequestException('Промокод не найден');
            }
            if (promoCode.minPrice && dto.totalAmount < promoCode.minPrice) {
                throw new common_1.BadRequestException(`Минимальная сумма для применения промокода: ${promoCode.minPrice} ₽`);
            }
            const existingOrder = await this.prismaService.order.findFirst({
                where: {
                    accountId: accountId,
                    promoCodeId: dto.promoCodeId
                }
            });
            if (existingOrder) {
                throw new common_1.BadRequestException('Вы уже использовали этот промокод');
            }
        }
        const productsDeliveryFromDb = await this.prismaService.productDelivery.findMany({
            where: {
                id: { in: dto.items.map(item => item.productId) }
            }
        });
        const productsCateringFromDb = await this.prismaService.productCatering.findMany({
            where: {
                id: { in: dto.items.map(item => item.productId) }
            }
        });
        const allProducts = [
            ...productsDeliveryFromDb,
            ...productsCateringFromDb
        ];
        let order;
        try {
            order = await this.prismaService.order.create({
                data: {
                    accountId: accountId,
                    promoCodeId: dto.promoCodeId || null,
                    totalAmount: dto.totalAmount,
                    items: {
                        create: dto.items.map(item => {
                            const product = allProducts.find(p => p.id === item.productId);
                            if (!product) {
                                throw new common_1.BadRequestException(`Товар с id ${item.productId} не найден`);
                            }
                            return {
                                productId: item.productId,
                                name: product.name,
                                price: item.price,
                                quantity: item.quantity
                            };
                        })
                    }
                },
                include: {
                    items: true
                }
            });
        }
        catch (error) {
            if (error instanceof common_1.BadRequestException)
                throw error;
            this.logger.error(`Ошибка записи заказа в БД: ${error.message}`);
            throw new common_1.BadRequestException('Не удалось сохранить заказ, свяжитесь по номеру: +7 (924) 805-33-55');
        }
        const cartDetails = order.items
            .map(item => `${item.name} — ${item.quantity} шт.`)
            .join('\n');
        const paymentText = dto.paymentMethod === 'cash'
            ? 'Наличные'
            : dto.paymentMethod === 'card'
                ? 'Картой'
                : 'Не выбрано';
        const deliveryText = dto.isDelivery
            ? `Адрес: ${dto.address ?? '—'}\nДата и время: ${dto.deliveryOption ?? 'Сразу как будет готово'}`
            : 'Самовывоз';
        const message = `Новый заказ:\n\n` +
            `Товары:\n${cartDetails}\n` +
            `Имя: ${dto.name ?? '—'}\n` +
            `Телефон: ${dto.phone ?? '—'}\n` +
            `${deliveryText}\n` +
            `Вариант оплаты: ${paymentText}\n\n` +
            `Общая сумма: ${dto.totalAmount} ₽`;
        const [, telegramSent] = await Promise.all([
            this.sendOrderEmail(message),
            this.sendTelegramWithRetry(message)
        ]);
        if (!telegramSent) {
            throw new common_1.BadRequestException('Ошибка отправки вашего заказа, свяжитесь по номеру: +7 (924) 805-33-55');
        }
        return order;
    }
    async getOrderHistory(token) {
        const decoded = this.jwtService.verify(token);
        const accountId = decoded.id;
        if (!accountId)
            throw new common_1.UnauthorizedException('Невалидный токен');
        const orders = await this.prismaService.order.findMany({
            where: { accountId },
            include: {
                items: true,
                promoCode: {
                    include: {
                        products: true
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        });
        return orders;
    }
};
exports.OrderService = OrderService;
exports.OrderService = OrderService = OrderService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService,
        client_mail_service_1.ClientMailService])
], OrderService);
//# sourceMappingURL=order.service.js.map