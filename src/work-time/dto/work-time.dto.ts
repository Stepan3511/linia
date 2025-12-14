import { IsOptional, IsString } from 'class-validator'

export class WorkTimeDto {
	@IsString()
	@IsOptional()
	from: string

	@IsString()
	@IsOptional()
	to: string

	@IsString()
	@IsOptional()
	message: string
}
