import { CreateStoriesDto } from './create-stories.dto';
import { CreateStoryDto } from './create-story.dto';
declare const UpdateStoriesDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateStoriesDto>>;
export declare class UpdateStoriesDto extends UpdateStoriesDto_base {
    name?: string;
    description?: string;
    stories?: CreateStoryDto[];
}
export {};
