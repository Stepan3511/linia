"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientMailModule = void 0;
const common_1 = require("@nestjs/common");
const mailer_1 = require("@nestjs-modules/mailer");
const config_1 = require("@nestjs/config");
const mailer_config_1 = require("../config/mailer.config");
const client_mail_service_1 = require("./client-mail.service");
let ClientMailModule = class ClientMailModule {
};
exports.ClientMailModule = ClientMailModule;
exports.ClientMailModule = ClientMailModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mailer_1.MailerModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: mailer_config_1.getMailerConfig,
                inject: [config_1.ConfigService]
            })
        ],
        providers: [client_mail_service_1.ClientMailService],
        exports: [client_mail_service_1.ClientMailService]
    })
], ClientMailModule);
//# sourceMappingURL=client-mail.module.js.map