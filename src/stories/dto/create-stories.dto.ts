import {
	IsString,
	IsNotEmpty,
	IsOptional,
	ValidateNested
} from 'class-validator'
import { Type } from 'class-transformer'
import { CreateStoryDto } from './create-story.dto'

export class CreateStoriesDto {
	@IsString({ message: 'Название группы обязательно' })
	@IsNotEmpty({ message: 'Название группы не может быть пустым' })
	name: string

	@IsString({ message: 'Описание должно быть строкой' })
	@IsOptional()
	description?: string

	@ValidateNested({ each: true })
	@Type(() => CreateStoryDto)
	@IsOptional()
	stories?: CreateStoryDto[]
}
