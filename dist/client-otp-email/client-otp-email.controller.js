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
exports.ClientOtpEmailController = void 0;
const common_1 = require("@nestjs/common");
const client_otp_email_service_1 = require("./client-otp-email.service");
let ClientOtpEmailController = class ClientOtpEmailController {
    constructor(clientOtpEmailService) {
        this.clientOtpEmailService = clientOtpEmailService;
    }
    async sendOtp(email) {
        return this.clientOtpEmailService.sendOtp(email);
    }
};
exports.ClientOtpEmailController = ClientOtpEmailController;
__decorate([
    (0, common_1.Post)('send-otp'),
    __param(0, (0, common_1.Body)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ClientOtpEmailController.prototype, "sendOtp", null);
exports.ClientOtpEmailController = ClientOtpEmailController = __decorate([
    (0, common_1.Controller)('client-auth'),
    __metadata("design:paramtypes", [client_otp_email_service_1.ClientOtpEmailService])
], ClientOtpEmailController);
//# sourceMappingURL=client-otp-email.controller.js.map