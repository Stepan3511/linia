import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import * as express from 'express'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)

	app.use(express.json({ limit: '50mb' }))
	app.use(express.urlencoded({ extended: true, limit: '50mb' }))

	app.setGlobalPrefix('api')
	app.enableCors()
	app.use('/api/uploads', express.static('uploads'))
	await app.listen(4200)
}

bootstrap()
