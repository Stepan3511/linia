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
var ClientAuthService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientAuthService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
const jwt_1 = require("@nestjs/jwt");
const client_otp_email_service_1 = require("../client-otp-email/client-otp-email.service");
let ClientAuthService = ClientAuthService_1 = class ClientAuthService {
    constructor(clentOtpEmailService, prismaService, jwtService) {
        this.clentOtpEmailService = clentOtpEmailService;
        this.prismaService = prismaService;
        this.jwtService = jwtService;
        this.revokedTokens = new Set();
        this.logger = new common_1.Logger(ClientAuthService_1.name);
    }
    async login(email, otp) {
        const isValid = await this.clentOtpEmailService.verifyOtp(email, otp);
        if (!isValid) {
            throw new common_1.UnauthorizedException('Неверный код');
        }
        const account = await this.prismaService.accounts.findUnique({
            where: { email }
        });
        if (!account) {
            throw new common_1.UnauthorizedException('Пользователь не найден');
        }
        const { accessToken, refreshToken } = this.issueTokens(account.id);
        return {
            account: {
                id: account.id,
                createdAt: account.createdAt,
                updatedAt: account.updatedAt,
                email: account.email
            },
            accessToken,
            refreshToken
        };
    }
    async refreshTokens(refreshToken) {
        if (this.revokedTokens.has(refreshToken)) {
            throw new common_1.UnauthorizedException('Refresh токен аннулирован');
        }
        let decoded;
        try {
            decoded = await this.jwtService.verifyAsync(refreshToken);
        }
        catch (error) {
            this.logger.warn('Невалидный refresh токен', error);
            throw new common_1.UnauthorizedException('Невалидный refresh токен');
        }
        if (!decoded || typeof decoded !== 'object' || !decoded.id) {
            this.logger.error('decoded токен не содержит ID', decoded);
            throw new common_1.UnauthorizedException('Refresh токен не содержит ID');
        }
        const user = await this.prismaService.accounts.findUnique({
            where: { id: decoded.id }
        });
        if (!user) {
            this.logger.warn(`Пользователь с ID ${decoded.id} не найден`);
            throw new common_1.UnauthorizedException('Пользователь не найден');
        }
        const tokens = this.issueTokens(user.id);
        this.logger.log(`Токены успешно обновлены для пользователя ID: ${user.id}`);
        return tokens;
    }
    async logout(refreshToken) {
        this.revokedTokens.add(refreshToken);
        this.logger.log(`Refresh токен отозван: ${refreshToken}`);
        return { message: 'Выход выполнен' };
    }
    issueTokens(userId) {
        const payload = { id: userId };
        const accessToken = this.jwtService.sign(payload, { expiresIn: '1h' });
        const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });
        return { accessToken, refreshToken };
    }
};
exports.ClientAuthService = ClientAuthService;
exports.ClientAuthService = ClientAuthService = ClientAuthService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [client_otp_email_service_1.ClientOtpEmailService,
        prisma_service_1.PrismaService,
        jwt_1.JwtService])
], ClientAuthService);
//# sourceMappingURL=client-auth.service.js.map