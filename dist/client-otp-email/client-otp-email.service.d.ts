import { PrismaService } from '../prisma.service';
import { ClientMailService } from '../client-mail/client-mail.service';
export declare class ClientOtpEmailService {
    private readonly prisma;
    private readonly clientMailService;
    constructor(prisma: PrismaService, clientMailService: ClientMailService);
    sendOtp(email: string): Promise<string>;
    verifyOtp(email: string, otp: number): Promise<boolean>;
}
