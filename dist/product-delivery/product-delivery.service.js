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
exports.ProductDeliveryService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let ProductDeliveryService = class ProductDeliveryService {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async getAll() {
        const product = await this.prismaService.productDelivery.findMany({
            orderBy: {
                createdAt: 'desc'
            },
            include: {
                category: true
            }
        });
        return product;
    }
    async getById(id) {
        const product = await this.prismaService.productDelivery.findUnique({
            where: {
                id
            },
            include: {
                category: true
            }
        });
        if (!product)
            throw new common_1.NotFoundException('Товар не найден');
        return product;
    }
    async getByCategory(categoryId) {
        const products = await this.prismaService.productDelivery.findMany({
            where: {
                category: {
                    id: categoryId
                }
            },
            include: {
                category: true
            }
        });
        if (!products)
            throw new common_1.NotFoundException('Товары не найдены');
        return products;
    }
    async create(dto) {
        return this.prismaService.productDelivery.create({
            data: {
                name: dto.name,
                description: dto.description,
                weight: dto.weight,
                pieces: dto.pieces,
                price: dto.price,
                image: dto.image,
                categoryId: dto.categoryId,
                cateringCart: dto.cateringCart,
                deliveryCart: dto.deliveryCart
            }
        });
    }
    async update(id, dto) {
        await this.getById(id);
        return this.prismaService.productDelivery.update({
            where: { id },
            data: dto
        });
    }
    async delete(id) {
        await this.getById(id);
        return this.prismaService.productDelivery.delete({
            where: { id }
        });
    }
};
exports.ProductDeliveryService = ProductDeliveryService;
exports.ProductDeliveryService = ProductDeliveryService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProductDeliveryService);
//# sourceMappingURL=product-delivery.service.js.map