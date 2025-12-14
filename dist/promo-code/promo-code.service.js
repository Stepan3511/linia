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
exports.PromoCodeService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let PromoCodeService = class PromoCodeService {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async getAll() {
        return this.prismaService.promoCode.findMany({
            where: {
                isArchive: false
            },
            include: {
                products: true
            }
        });
    }
    async getById(id) {
        const promoCode = await this.prismaService.promoCode.findUnique({
            where: { id },
            include: {
                products: true
            }
        });
        if (!promoCode)
            throw new common_1.NotFoundException('Promo Code не найден');
        return promoCode;
    }
    async create(dto) {
        const promoCode = await this.prismaService.promoCode.create({
            data: {
                name: dto.name,
                minPrice: dto.minPrice ? parseFloat(dto.minPrice) : undefined,
                products: dto.productIds?.length
                    ? {
                        connect: dto.productIds.map(id => ({ id }))
                    }
                    : undefined
            },
            include: {
                products: true
            }
        });
        return promoCode;
    }
    async update(id, dto) {
        await this.getById(id);
        const updatedPromo = await this.prismaService.promoCode.update({
            where: { id },
            data: {
                name: dto.name,
                minPrice: dto.minPrice ? parseFloat(dto.minPrice) : undefined,
                products: {
                    set: [],
                    connect: dto.productIds?.length
                        ? dto.productIds.map(id => ({ id }))
                        : undefined
                }
            },
            include: {
                products: true
            }
        });
        return updatedPromo;
    }
    async delete(id) {
        await this.getById(id);
        await this.prismaService.promoCode.update({
            where: { id },
            data: {
                products: {
                    set: []
                }
            }
        });
        return this.prismaService.promoCode.delete({
            where: { id }
        });
    }
    async archive(id) {
        const promoCode = await this.prismaService.promoCode.findUnique({
            where: { id }
        });
        if (!promoCode) {
            throw new common_1.NotFoundException('Promo Code не найден');
        }
        const updated = await this.prismaService.promoCode.update({
            where: { id },
            data: {
                isArchive: true
            }
        });
        return updated;
    }
    async getArchived() {
        return this.prismaService.promoCode.findMany({
            where: {
                isArchive: true
            },
            include: {
                products: true
            }
        });
    }
    async restoreFromArchive(id) {
        return this.prismaService.promoCode.update({
            where: { id },
            data: { isArchive: false }
        });
    }
};
exports.PromoCodeService = PromoCodeService;
exports.PromoCodeService = PromoCodeService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PromoCodeService);
//# sourceMappingURL=promo-code.service.js.map