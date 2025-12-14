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
exports.ProductDeliveryDto = void 0;
const class_validator_1 = require("class-validator");
class ProductDeliveryDto {
}
exports.ProductDeliveryDto = ProductDeliveryDto;
__decorate([
    (0, class_validator_1.IsString)({
        message: 'Название обязательно'
    }),
    (0, class_validator_1.IsNotEmpty)({
        message: 'Название не может быть пустым'
    }),
    __metadata("design:type", String)
], ProductDeliveryDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ProductDeliveryDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsNumber)({}, {
        message: 'Вес должн быть числом'
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], ProductDeliveryDto.prototype, "weight", void 0);
__decorate([
    (0, class_validator_1.IsNumber)({}, {
        message: 'Количество должно быть числом'
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], ProductDeliveryDto.prototype, "pieces", void 0);
__decorate([
    (0, class_validator_1.IsNumber)({}, {
        message: 'Цена должна быть числом'
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], ProductDeliveryDto.prototype, "price", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ProductDeliveryDto.prototype, "image", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ProductDeliveryDto.prototype, "categoryId", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], ProductDeliveryDto.prototype, "cateringCart", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], ProductDeliveryDto.prototype, "deliveryCart", void 0);
//# sourceMappingURL=product-delivery.dto.js.map