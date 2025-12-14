import { IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class CreateStoryDto {
	@IsString({ message: 'URL изображения должен быть строкой' })
	@IsNotEmpty({ message: 'Изображение обязательно' })
	image: string

	@IsString()
	@IsOptional()
	id?: string
}
