import {
	IsArray,
	IsBoolean,
	IsNotEmpty,
	IsNumber,
	IsOptional,
	IsString,
	ValidateNested
} from 'class-validator'
import { Type } from 'class-transformer'

export class CreateOrderItemDto {
	@IsString()
	@IsNotEmpty()
	productId: string

	@IsNumber()
	@IsNotEmpty()
	quantity: number

	@IsNumber()
	@IsNotEmpty()
	price: number

	@IsString()
	@IsNotEmpty()
	name: string
}

export class CreateOrderDto {
	@IsOptional()
	@IsString()
	promoCodeId?: string

	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => CreateOrderItemDto)
	items: CreateOrderItemDto[]

	@IsNumber()
	@IsNotEmpty()
	totalAmount: number

	@IsOptional()
	@IsString()
	name?: string

	@IsOptional()
	@IsString()
	phone?: string

	@IsOptional()
	@IsString()
	address?: string

	@IsOptional()
	@IsString()
	deliveryOption?: string

	@IsOptional()
	@IsBoolean()
	isDelivery?: boolean

	@IsOptional()
	@IsString()
	paymentMethod?: string
}
