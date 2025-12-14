import { PrismaService } from '../prisma.service';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { ClientUserService } from './client-user.service';
export declare class ClientUserController {
    private readonly prismaService;
    private readonly jwtService;
    private readonly clientUserService;
    constructor(prismaService: PrismaService, jwtService: JwtService, clientUserService: ClientUserService);
    getProfile(req: Request): Promise<{
        email: string;
    }>;
    getAllUsers(): Promise<{
        id: string;
        email: string;
        promoCodesUsed: {
            promoCodeId: string;
            promoCodeName: string;
        }[];
    }[]>;
}
