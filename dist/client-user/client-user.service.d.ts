import { PrismaService } from '../prisma.service';
export declare class ClientUserService {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    getUserById(userId: string): Promise<{
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
