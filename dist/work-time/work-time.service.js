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
exports.WorkTimeService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let WorkTimeService = class WorkTimeService {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async getAll() {
        const product = await this.prismaService.workTime.findMany();
        return product;
    }
    async getById(id) {
        const product = await this.prismaService.workTime.findUnique({
            where: {
                id
            }
        });
        if (!product)
            throw new common_1.NotFoundException('Work Time не найдено');
        return product;
    }
    async create(dto) {
        return this.prismaService.workTime.create({
            data: {
                from: dto.from,
                to: dto.to,
                message: dto.message
            }
        });
    }
    async update(id, dto) {
        await this.getById(id);
        return this.prismaService.workTime.update({
            where: { id },
            data: dto
        });
    }
    async delete(id) {
        await this.getById(id);
        return this.prismaService.workTime.delete({
            where: { id }
        });
    }
};
exports.WorkTimeService = WorkTimeService;
exports.WorkTimeService = WorkTimeService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], WorkTimeService);
//# sourceMappingURL=work-time.service.js.map