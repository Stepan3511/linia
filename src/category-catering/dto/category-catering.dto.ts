import { IsNotEmpty, IsString } from 'class-validator'

export class CategoryCateringDto {
	@IsString({
		message: 'Название обязательно'
	})
	@IsNotEmpty({
		message: 'Название не может быть пустым'
	})
	name: string
}
