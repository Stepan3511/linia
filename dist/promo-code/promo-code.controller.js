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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PromoCodeController = void 0;
const common_1 = require("@nestjs/common");
const promo_code_service_1 = require("./promo-code.service");
const promo_code_dto_1 = require("./dto/promo-code.dto");
const auth_decorator_1 = require("../auth/decorators/auth.decorator");
let PromoCodeController = class PromoCodeController {
    constructor(promoCodeService) {
        this.promoCodeService = promoCodeService;
    }
    async getAll() {
        return this.promoCodeService.getAll();
    }
    async getById(id) {
        return this.promoCodeService.getById(id);
    }
    async create(dto) {
        return this.promoCodeService.create(dto);
    }
    async update(id, dto) {
        return this.promoCodeService.update(id, dto);
    }
    async delete(id) {
        return this.promoCodeService.delete(id);
    }
    async archive(id) {
        return this.promoCodeService.archive(id);
    }
    async getArchived() {
        return this.promoCodeService.getArchived();
    }
    async restore(id) {
        return this.promoCodeService.restoreFromArchive(id);
    }
};
exports.PromoCodeController = PromoCodeController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PromoCodeController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)('by-id/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PromoCodeController.prototype, "getById", null);
__decorate([
    (0, auth_decorator_1.Auth)(),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, common_1.HttpCode)(200),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [promo_code_dto_1.PromoCodeDto]),
    __metadata("design:returntype", Promise)
], PromoCodeController.prototype, "create", null);
__decorate([
    (0, auth_decorator_1.Auth)(),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, common_1.HttpCode)(200),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, promo_code_dto_1.PromoCodeDto]),
    __metadata("design:returntype", Promise)
], PromoCodeController.prototype, "update", null);
__decorate([
    (0, auth_decorator_1.Auth)(),
    (0, common_1.HttpCode)(200),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PromoCodeController.prototype, "delete", null);
__decorate([
    (0, auth_decorator_1.Auth)(),
    (0, common_1.Patch)('archive/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PromoCodeController.prototype, "archive", null);
__decorate([
    (0, auth_decorator_1.Auth)(),
    (0, common_1.Get)('archived'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PromoCodeController.prototype, "getArchived", null);
__decorate([
    (0, auth_decorator_1.Auth)(),
    (0, common_1.HttpCode)(200),
    (0, common_1.Post)(':id/restore'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PromoCodeController.prototype, "restore", null);
exports.PromoCodeController = PromoCodeController = __decorate([
    (0, common_1.Controller)('promo-code'),
    __metadata("design:paramtypes", [promo_code_service_1.PromoCodeService])
], PromoCodeController);
//# sourceMappingURL=promo-code.controller.js.map