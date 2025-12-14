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
exports.ClientOtpEmailService = void 0;
const common_1 = require("@nestjs/common");
const date_fns_1 = require("date-fns");
const prisma_service_1 = require("../prisma.service");
const client_mail_service_1 = require("../client-mail/client-mail.service");
let ClientOtpEmailService = class ClientOtpEmailService {
    constructor(prisma, clientMailService) {
        this.prisma = prisma;
        this.clientMailService = clientMailService;
    }
    async sendOtp(email) {
        const otp = Math.floor(100000 + Math.random() * 900000);
        const expiresAt = Math.floor((0, date_fns_1.addMinutes)(new Date(), 15).getTime() / 1000);
        await this.prisma.accounts.upsert({
            where: { email },
            update: { otp, expiresAt },
            create: { email, otp, expiresAt }
        });
        await this.clientMailService.sendMail(email, 'Код для входа', `<p>Ваш код: <b>${otp}</b></p><p>Он действителен 15 минут.</p>`);
        return 'Код отправлен на почту';
    }
    async verifyOtp(email, otp) {
        const account = await this.prisma.accounts.findUnique({
            where: { email }
        });
        if (!account)
            return false;
        if ((0, date_fns_1.isBefore)(new Date(), new Date(account.expiresAt * 1000))) {
            return account.otp === otp;
        }
        await this.prisma.accounts.update({
            where: { email },
            data: { otp: null, expiresAt: null }
        });
        return false;
    }
};
exports.ClientOtpEmailService = ClientOtpEmailService;
exports.ClientOtpEmailService = ClientOtpEmailService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        client_mail_service_1.ClientMailService])
], ClientOtpEmailService);
//# sourceMappingURL=client-otp-email.service.js.map