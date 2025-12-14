import { ArrayUnique, IsArray, IsOptional, IsString } from 'class-validator'

export class PromoCodeDto {
	@IsString()
	@IsOptional()
	name: string

	@IsString()
	@IsOptional()
	minPrice: string

	@IsArray()
	@ArrayUnique()
	@IsString({ each: true })
	@IsOptional()
	productIds: string[]
}
