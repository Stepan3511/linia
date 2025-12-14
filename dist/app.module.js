"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const product_delivery_module_1 = require("./product-delivery/product-delivery.module");
const product_catering_module_1 = require("./product-catering/product-catering.module");
const category_catering_module_1 = require("./category-catering/category-catering.module");
const category_delivery_module_1 = require("./category-delivery/category-delivery.module");
const file_module_1 = require("./file/file.module");
const auth_module_1 = require("./auth/auth.module");
const user_module_1 = require("./user/user.module");
const stories_module_1 = require("./stories/stories.module");
const file_stories_module_1 = require("./file-stories/file-stories.module");
const work_time_module_1 = require("./work-time/work-time.module");
const holiday_time_module_1 = require("./holiday-time/holiday-time.module");
const promo_code_module_1 = require("./promo-code/promo-code.module");
const client_mail_module_1 = require("./client-mail/client-mail.module");
const client_user_module_1 = require("./client-user/client-user.module");
const client_otp_email_module_1 = require("./client-otp-email/client-otp-email.module");
const client_auth_module_1 = require("./client-auth/client-auth.module");
const order_module_1 = require("./order/order.module");
const banner_module_1 = require("./banner/banner.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            file_module_1.FileModule,
            product_delivery_module_1.ProductDeliveryModule,
            product_catering_module_1.ProductCateringModule,
            category_catering_module_1.CategoryCateringModule,
            category_delivery_module_1.CategoryDeliveryModule,
            auth_module_1.AuthModule,
            user_module_1.UserModule,
            stories_module_1.StoriesModule,
            file_stories_module_1.FileStoriesModule,
            work_time_module_1.workTimeModule,
            holiday_time_module_1.holidayTimeModule,
            promo_code_module_1.promoCodeModule,
            client_auth_module_1.ClientAuthModule,
            client_otp_email_module_1.ClientOtpEmailModule,
            client_user_module_1.ClientUserModule,
            client_mail_module_1.ClientMailModule,
            order_module_1.OrderModule,
            banner_module_1.BannerModule
        ],
        controllers: [],
        providers: []
    })
], AppModule);
//# sourceMappingURL=app.module.js.map