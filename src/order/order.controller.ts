import {
	Body,
	Controller,
	Get,
	HttpCode,
	Post,
	Req,
	UnauthorizedException,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import { OrderService } from './order.service'
import { CreateOrderDto } from './dto/create-order.dto'
import { Request } from 'express'

@Controller('order')
export class OrderController {
	constructor(private readonly orderService: OrderService) {}

	@Post()
	@HttpCode(200)
	@UsePipes(new ValidationPipe())
	async createOrder(@Body() dto: CreateOrderDto, @Req() req: Request) {
		const token = req.headers['authorization']?.split(' ')[1]

		if (!token) {
			throw new UnauthorizedException('Токен не предоставлен')
		}

		return this.orderService.createOrder(dto, token)
	}

	@Get('history')
	async getOrderHistory(@Req() req: Request) {
		const token = req.headers['authorization']?.split(' ')[1]

		if (!token) {
			throw new UnauthorizedException('Токен не предоставлен')
		}

		return this.orderService.getOrderHistory(token)
	}
}
