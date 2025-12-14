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
exports.ClientUserService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let ClientUserService = class ClientUserService {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async getUserById(userId) {
        const user = await this.prismaService.accounts.findUnique({
            where: { id: userId }
        });
        if (!user) {
            throw new Error('Пользователь не найден');
        }
        return { email: user.email };
    }
    async getAllUsers() {
        const users = await this.prismaService.accounts.findMany({
            include: {
                orders: {
                    include: {
                        promoCode: true
                    }
                }
            }
        });
        return users.map(user => ({
            id: user.id,
            email: user.email,
            promoCodesUsed: user.orders
                .filter(order => order.promoCode !== null)
                .map(order => ({
                promoCodeId: order.promoCode.id,
                promoCodeName: order.promoCode.name
            }))
        }));
    }
};
exports.ClientUserService = ClientUserService;
exports.ClientUserService = ClientUserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ClientUserService);
//# sourceMappingURL=client-user.service.js.map