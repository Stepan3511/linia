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
exports.ProductDeliveryController = void 0;
const common_1 = require("@nestjs/common");
const product_delivery_service_1 = require("./product-delivery.service");
const product_delivery_dto_1 = require("./dto/product-delivery.dto");
const auth_decorator_1 = require("../auth/decorators/auth.decorator");
let ProductDeliveryController = class ProductDeliveryController {
    constructor(productDeliveryService) {
        this.productDeliveryService = productDeliveryService;
    }
    async getAll() {
        return this.productDeliveryService.getAll();
    }
    async getById(id) {
        return this.productDeliveryService.getById(id);
    }
    async getByCategory(categoryId) {
        return this.productDeliveryService.getByCategory(categoryId);
    }
    async create(dto) {
        return await this.productDeliveryService.create(dto);
    }
    async update(id, dto) {
        return this.productDeliveryService.update(id, dto);
    }
    async delete(id) {
        return this.productDeliveryService.delete(id);
    }
};
exports.ProductDeliveryController = ProductDeliveryController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProductDeliveryController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)('by-id/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductDeliveryController.prototype, "getById", null);
__decorate([
    (0, common_1.Get)('by-category/:categoryId'),
    __param(0, (0, common_1.Param)('categoryId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductDeliveryController.prototype, "getByCategory", null);
__decorate([
    (0, auth_decorator_1.Auth)(),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, common_1.HttpCode)(200),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [product_delivery_dto_1.ProductDeliveryDto]),
    __metadata("design:returntype", Promise)
], ProductDeliveryController.prototype, "create", null);
__decorate([
    (0, auth_decorator_1.Auth)(),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, common_1.HttpCode)(200),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, product_delivery_dto_1.ProductDeliveryDto]),
    __metadata("design:returntype", Promise)
], ProductDeliveryController.prototype, "update", null);
__decorate([
    (0, auth_decorator_1.Auth)(),
    (0, common_1.HttpCode)(200),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductDeliveryController.prototype, "delete", null);
exports.ProductDeliveryController = ProductDeliveryController = __decorate([
    (0, common_1.Controller)('delivery'),
    __metadata("design:paramtypes", [product_delivery_service_1.ProductDeliveryService])
], ProductDeliveryController);
//# sourceMappingURL=product-delivery.controller.js.map