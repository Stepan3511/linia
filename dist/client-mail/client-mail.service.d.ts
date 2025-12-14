import { MailerService } from '@nestjs-modules/mailer';
export declare class ClientMailService {
    private readonly mailerService;
    constructor(mailerService: MailerService);
    sendMail(to: string, subject: string, html: string): Promise<void>;
}
