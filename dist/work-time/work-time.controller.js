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
exports.WorkTimeController = void 0;
const common_1 = require("@nestjs/common");
const work_time_service_1 = require("./work-time.service");
const work_time_dto_1 = require("./dto/work-time.dto");
const auth_decorator_1 = require("../auth/decorators/auth.decorator");
let WorkTimeController = class WorkTimeController {
    constructor(workTimeService) {
        this.workTimeService = workTimeService;
    }
    async getAll() {
        return this.workTimeService.getAll();
    }
    async getById(id) {
        return this.workTimeService.getById(id);
    }
    async create(dto) {
        return await this.workTimeService.create(dto);
    }
    async update(id, dto) {
        return this.workTimeService.update(id, dto);
    }
    async delete(id) {
        return this.workTimeService.delete(id);
    }
};
exports.WorkTimeController = WorkTimeController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], WorkTimeController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)('by-id/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], WorkTimeController.prototype, "getById", null);
__decorate([
    (0, auth_decorator_1.Auth)(),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, common_1.HttpCode)(200),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [work_time_dto_1.WorkTimeDto]),
    __metadata("design:returntype", Promise)
], WorkTimeController.prototype, "create", null);
__decorate([
    (0, auth_decorator_1.Auth)(),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, common_1.HttpCode)(200),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, work_time_dto_1.WorkTimeDto]),
    __metadata("design:returntype", Promise)
], WorkTimeController.prototype, "update", null);
__decorate([
    (0, auth_decorator_1.Auth)(),
    (0, common_1.HttpCode)(200),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], WorkTimeController.prototype, "delete", null);
exports.WorkTimeController = WorkTimeController = __decorate([
    (0, common_1.Controller)('work-time'),
    __metadata("design:paramtypes", [work_time_service_1.WorkTimeService])
], WorkTimeController);
//# sourceMappingURL=work-time.controller.js.map