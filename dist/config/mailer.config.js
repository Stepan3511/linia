"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMailerConfig = void 0;
const getMailerConfig = async (configService) => ({
    transport: {
        host: configService.getOrThrow('MAIL_HOST'),
        port: configService.getOrThrow('MAIL_PORT'),
        secure: false,
        auth: {
            user: configService.getOrThrow('MAIL_LOGIN'),
            pass: configService.getOrThrow('MAIL_PASSWORD')
        }
    },
    defaults: {
        from: `"Линия вкуса" <${configService.getOrThrow('MAIL_LOGIN')}>`
    }
});
exports.getMailerConfig = getMailerConfig;
//# sourceMappingURL=mailer.config.js.map