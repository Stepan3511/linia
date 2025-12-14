import { PartialType } from '@nestjs/mapped-types'
import { CreateStoriesDto } from './create-stories.dto'
import { IsString, IsOptional, IsArray, ValidateNested } from 'class-validator'
import { Type } from 'class-transformer'
import { CreateStoryDto } from './create-story.dto'

export class UpdateStoriesDto extends PartialType(CreateStoriesDto) {
	@IsString()
	@IsOptional()
	name?: string

	@IsString()
	@IsOptional()
	description?: string

	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => CreateStoryDto)
	@IsOptional()
	stories?: CreateStoryDto[]
}
