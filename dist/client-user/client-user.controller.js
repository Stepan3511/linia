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
exports.ClientUserController = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
const jwt_1 = require("@nestjs/jwt");
const client_user_service_1 = require("./client-user.service");
let ClientUserController = class ClientUserController {
    constructor(prismaService, jwtService, clientUserService) {
        this.prismaService = prismaService;
        this.jwtService = jwtService;
        this.clientUserService = clientUserService;
    }
    async getProfile(req) {
        const token = req.headers['authorization']?.split(' ')[1];
        if (!token) {
            throw new common_1.UnauthorizedException('Токен не предоставлен');
        }
        try {
            const decoded = this.jwtService.verify(token);
            const userId = decoded.id;
            if (!userId) {
                throw new common_1.UnauthorizedException('Невалидный токен');
            }
            const user = await this.prismaService.accounts.findUnique({
                where: { id: userId }
            });
            if (!user) {
                throw new common_1.UnauthorizedException('Пользователь не найден');
            }
            return { email: user.email };
        }
        catch (error) {
            throw new common_1.UnauthorizedException('Невалидный токен');
        }
    }
    async getAllUsers() {
        return this.clientUserService.getAllUsers();
    }
};
exports.ClientUserController = ClientUserController;
__decorate([
    (0, common_1.Get)('profile'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ClientUserController.prototype, "getProfile", null);
__decorate([
    (0, common_1.Get)('all-users'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ClientUserController.prototype, "getAllUsers", null);
exports.ClientUserController = ClientUserController = __decorate([
    (0, common_1.Controller)('client-user'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService,
        client_user_service_1.ClientUserService])
], ClientUserController);
//# sourceMappingURL=client-user.controller.js.map