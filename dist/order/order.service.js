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
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
const jwt_1 = require("@nestjs/jwt");
let OrderService = class OrderService {
    constructor(prismaService, jwtService) {
        this.prismaService = prismaService;
        this.jwtService = jwtService;
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
        const order = await this.prismaService.order.create({
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
exports.OrderService = OrderService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService])
], OrderService);
//# sourceMappingURL=order.service.js.map