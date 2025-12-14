import {
	IsBoolean,
	IsNotEmpty,
	IsNumber,
	IsOptional,
	IsString
} from 'class-validator'

export class ProductCateringDto {
	@IsString({
		message: 'Название обязательно'
	})
	@IsNotEmpty({
		message: 'Название не может быть пустым'
	})
	name: string

	@IsOptional()
	@IsString()
	description: string

	@IsNumber(
		{},
		{
			message: 'Вес должн быть числом'
		}
	)
	@IsOptional()
	weight: number

	@IsNumber(
		{},
		{
			message: 'Цена должна быть числом'
		}
	)
	@IsOptional()
	price: number

	@IsString()
	@IsOptional()
	image: string

	@IsString()
	@IsOptional()
	categoryId: string

	@IsBoolean()
	@IsOptional()
	cateringCart: boolean

	@IsBoolean()
	@IsOptional()
	deliveryCart: boolean
}
