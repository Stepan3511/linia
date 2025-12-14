import { PrismaService } from '../prisma.service';
import { JwtService } from '@nestjs/jwt';
import { ClientOtpEmailService } from '../client-otp-email/client-otp-email.service';
export declare class ClientAuthService {
    private readonly clentOtpEmailService;
    private readonly prismaService;
    private readonly jwtService;
    private readonly revokedTokens;
    private readonly logger;
    constructor(clentOtpEmailService: ClientOtpEmailService, prismaService: PrismaService, jwtService: JwtService);
    login(email: string, otp: number): Promise<any>;
    refreshTokens(refreshToken: string): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    logout(refreshToken: string): Promise<{
        message: string;
    }>;
    private issueTokens;
}
