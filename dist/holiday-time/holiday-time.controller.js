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
exports.HolidayTimeController = void 0;
const common_1 = require("@nestjs/common");
const holiday_time_service_1 = require("./holiday-time.service");
const holiday_time_dto_1 = require("./dto/holiday-time.dto");
const auth_decorator_1 = require("../auth/decorators/auth.decorator");
let HolidayTimeController = class HolidayTimeController {
    constructor(holidayTimeService) {
        this.holidayTimeService = holidayTimeService;
    }
    async getAll() {
        return this.holidayTimeService.getAll();
    }
    async getById(id) {
        return this.holidayTimeService.getById(id);
    }
    async create(dto) {
        return await this.holidayTimeService.create(dto);
    }
    async update(id, dto) {
        return this.holidayTimeService.update(id, dto);
    }
    async delete(id) {
        return this.holidayTimeService.delete(id);
    }
};
exports.HolidayTimeController = HolidayTimeController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], HolidayTimeController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)('by-id/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], HolidayTimeController.prototype, "getById", null);
__decorate([
    (0, auth_decorator_1.Auth)(),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, common_1.HttpCode)(200),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [holiday_time_dto_1.HolidayTimeDto]),
    __metadata("design:returntype", Promise)
], HolidayTimeController.prototype, "create", null);
__decorate([
    (0, auth_decorator_1.Auth)(),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, common_1.HttpCode)(200),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, holiday_time_dto_1.HolidayTimeDto]),
    __metadata("design:returntype", Promise)
], HolidayTimeController.prototype, "update", null);
__decorate([
    (0, auth_decorator_1.Auth)(),
    (0, common_1.HttpCode)(200),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], HolidayTimeController.prototype, "delete", null);
exports.HolidayTimeController = HolidayTimeController = __decorate([
    (0, common_1.Controller)('holiday-time'),
    __metadata("design:paramtypes", [holiday_time_service_1.HolidayTimeService])
], HolidayTimeController);
//# sourceMappingURL=holiday-time.controller.js.map