"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.holidayTimeModule = void 0;
const common_1 = require("@nestjs/common");
const holiday_time_service_1 = require("./holiday-time.service");
const holiday_time_controller_1 = require("./holiday-time.controller");
const prisma_service_1 = require("../prisma.service");
let holidayTimeModule = class holidayTimeModule {
};
exports.holidayTimeModule = holidayTimeModule;
exports.holidayTimeModule = holidayTimeModule = __decorate([
    (0, common_1.Module)({
        controllers: [holiday_time_controller_1.HolidayTimeController],
        providers: [holiday_time_service_1.HolidayTimeService, prisma_service_1.PrismaService]
    })
], holidayTimeModule);
//# sourceMappingURL=holiday-time.module.js.map