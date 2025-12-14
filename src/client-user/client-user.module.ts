import { Module } from '@nestjs/common'
import { ClientUserController } from './client-user.controller'
import { ClientUserService } from './client-user.service'
import { PrismaService } from '../prisma.service'
import { JwtModule } from '@nestjs/jwt'

@Module({
	imports: [
		JwtModule.register({
			secret: process.env.JWT_SECRET,
			signOptions: { expiresIn: '1h' }
		})
	],
	controllers: [ClientUserController],
	providers: [ClientUserService, PrismaService]
})
export class ClientUserModule {}
