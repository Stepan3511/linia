import { StoriesService } from './stories.service';
import { CreateStoriesDto } from './dto/create-stories.dto';
import { CreateStoryDto } from './dto/create-story.dto';
import { UpdateStoriesDto } from './dto/update-stories.dto';
export declare class StoriesController {
    private readonly storiesService;
    constructor(storiesService: StoriesService);
    create(createStoriesDto: CreateStoriesDto): Promise<{
        stories: {
            image: string;
            id: string;
            storiesId: string;
        }[];
    } & {
        name: string | null;
        description: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findAll(): Promise<({
        stories: {
            image: string;
            id: string;
            storiesId: string;
        }[];
    } & {
        name: string | null;
        description: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
    findOne(id: string): Promise<{
        stories: {
            image: string;
            id: string;
            storiesId: string;
        }[];
    } & {
        name: string | null;
        description: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(id: string, updateStoriesDto: UpdateStoriesDto): Promise<{
        stories: {
            image: string;
            id: string;
            storiesId: string;
        }[];
    } & {
        name: string | null;
        description: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    delete(id: string): Promise<{
        name: string | null;
        description: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    addStory(storiesId: string, createStoryDto: CreateStoryDto): Promise<{
        image: string;
        id: string;
        storiesId: string;
    }>;
    updateStory(storiesId: string, storyId: string, updateStoryDto: CreateStoryDto): Promise<{
        image: string;
        id: string;
        storiesId: string;
    }>;
    deleteStory(storiesId: string, storyId: string): Promise<{
        image: string;
        id: string;
        storiesId: string;
    }>;
}
