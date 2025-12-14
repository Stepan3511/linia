import { Module } from '@nestjs/common'
import { ProductDeliveryModule } from './product-delivery/product-delivery.module'
import { ProductCateringModule } from './product-catering/product-catering.module'
import { CategoryCateringModule } from './category-catering/category-catering.module'
import { CategoryDeliveryModule } from './category-delivery/category-delivery.module'
import { FileModule } from './file/file.module'
import { AuthModule } from './auth/auth.module'
import { UserModule } from './user/user.module'
import { StoriesModule } from './stories/stories.module'
import { FileStoriesModule } from './file-stories/file-stories.module'
import { workTimeModule } from './work-time/work-time.module'
import { holidayTimeModule } from './holiday-time/holiday-time.module'
import { promoCodeModule } from './promo-code/promo-code.module'
import { ClientMailModule } from './client-mail/client-mail.module'
import { ClientUserModule } from './client-user/client-user.module'
import { ClientOtpEmailModule } from './client-otp-email/client-otp-email.module'
import { ClientAuthModule } from './client-auth/client-auth.module'
import { OrderModule } from './order/order.module'
import { BannerModule } from './banner/banner.module'

@Module({
	imports: [
		FileModule,
		ProductDeliveryModule,
		ProductCateringModule,
		CategoryCateringModule,
		CategoryDeliveryModule,
		AuthModule,
		UserModule,
		StoriesModule,
		FileStoriesModule,
		workTimeModule,
		holidayTimeModule,
		promoCodeModule,
		ClientAuthModule,
		ClientOtpEmailModule,
		ClientUserModule,
		ClientMailModule,
		OrderModule,
		BannerModule
	],
	controllers: [],
	providers: []
})
export class AppModule {}
