import { ClientOtpEmailService } from './client-otp-email.service';
export declare class ClientOtpEmailController {
    private readonly clientOtpEmailService;
    constructor(clientOtpEmailService: ClientOtpEmailService);
    sendOtp(email: string): Promise<string>;
}
