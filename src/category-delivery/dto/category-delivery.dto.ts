import { IsNotEmpty, IsString } from 'class-validator'

export class CategoryDeliveryDto {
	@IsString({
		message: 'Название обязательно'
	})
	@IsNotEmpty({
		message: 'Название не может быть пустым'
	})
	name: string
}
