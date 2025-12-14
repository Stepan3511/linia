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
exports.CategoryDeliveryService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let CategoryDeliveryService = class CategoryDeliveryService {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async getAll() {
        const product = await this.prismaService.categoryDelivery.findMany({
            orderBy: {
                createdAt: 'desc'
            },
            include: {
                ProductDelivery: true
            }
        });
        return product;
    }
    async getById(id) {
        const product = await this.prismaService.categoryDelivery.findUnique({
            where: {
                id
            },
            include: {
                ProductDelivery: true
            }
        });
        if (!product)
            throw new common_1.NotFoundException('Категория не найдена');
        return product;
    }
    async create(dto) {
        return this.prismaService.categoryDelivery.create({
            data: {
                name: dto.name
            }
        });
    }
    async update(id, dto) {
        await this.getById(id);
        return this.prismaService.categoryDelivery.update({
            where: { id },
            data: dto
        });
    }
    async delete(id) {
        await this.getById(id);
        return this.prismaService.categoryDelivery.delete({
            where: { id }
        });
    }
};
exports.CategoryDeliveryService = CategoryDeliveryService;
exports.CategoryDeliveryService = CategoryDeliveryService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CategoryDeliveryService);
//# sourceMappingURL=category-delivery.service.js.map