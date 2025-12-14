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
exports.ProductCateringController = void 0;
const common_1 = require("@nestjs/common");
const product_catering_service_1 = require("./product-catering.service");
const product_catering_dto_1 = require("./dto/product-catering.dto");
const auth_decorator_1 = require("../auth/decorators/auth.decorator");
let ProductCateringController = class ProductCateringController {
    constructor(productCateringService) {
        this.productCateringService = productCateringService;
    }
    async getAll() {
        return this.productCateringService.getAll();
    }
    async getById(id) {
        return this.productCateringService.getById(id);
    }
    async getByCategory(categoryId) {
        return this.productCateringService.getByCategory(categoryId);
    }
    async create(dto) {
        return await this.productCateringService.create(dto);
    }
    async update(id, dto) {
        return this.productCateringService.update(id, dto);
    }
    async delete(id) {
        return this.productCateringService.delete(id);
    }
};
exports.ProductCateringController = ProductCateringController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProductCateringController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)('by-id/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductCateringController.prototype, "getById", null);
__decorate([
    (0, common_1.Get)('by-category/:categoryId'),
    __param(0, (0, common_1.Param)('categoryId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductCateringController.prototype, "getByCategory", null);
__decorate([
    (0, auth_decorator_1.Auth)(),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, common_1.HttpCode)(200),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [product_catering_dto_1.ProductCateringDto]),
    __metadata("design:returntype", Promise)
], ProductCateringController.prototype, "create", null);
__decorate([
    (0, auth_decorator_1.Auth)(),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, common_1.HttpCode)(200),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, product_catering_dto_1.ProductCateringDto]),
    __metadata("design:returntype", Promise)
], ProductCateringController.prototype, "update", null);
__decorate([
    (0, auth_decorator_1.Auth)(),
    (0, common_1.HttpCode)(200),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductCateringController.prototype, "delete", null);
exports.ProductCateringController = ProductCateringController = __decorate([
    (0, common_1.Controller)('catering'),
    __metadata("design:paramtypes", [product_catering_service_1.ProductCateringService])
], ProductCateringController);
//# sourceMappingURL=product-catering.controller.js.map