import {
	Controller,
	Post,
	Get,
	Param,
	Delete,
	Body,
	Patch
} from '@nestjs/common'
import { StoriesService } from './stories.service'
import { CreateStoriesDto } from './dto/create-stories.dto'
import { CreateStoryDto } from './dto/create-story.dto'
import { UpdateStoriesDto } from './dto/update-stories.dto'

@Controller('stories')
export class StoriesController {
	constructor(private readonly storiesService: StoriesService) {}

	@Post()
	async create(@Body() createStoriesDto: CreateStoriesDto) {
		return this.storiesService.create(createStoriesDto)
	}

	@Get()
	async findAll() {
		return this.storiesService.findAll()
	}

	@Get(':id')
	async findOne(@Param('id') id: string) {
		return this.storiesService.findOne(id)
	}

	@Patch(':id')
	async update(
		@Param('id') id: string,
		@Body() updateStoriesDto: UpdateStoriesDto
	) {
		return this.storiesService.update(id, updateStoriesDto)
	}

	@Delete(':id')
	async delete(@Param('id') id: string) {
		return this.storiesService.delete(id)
	}

	@Post(':id/story')
	async addStory(
		@Param('id') storiesId: string,
		@Body() createStoryDto: CreateStoryDto
	) {
		return this.storiesService.addStory(storiesId, createStoryDto)
	}

	@Patch(':id/story/:storyId')
	async updateStory(
		@Param('id') storiesId: string,
		@Param('storyId') storyId: string,
		@Body() updateStoryDto: CreateStoryDto
	) {
		return this.storiesService.updateStory(
			storiesId,
			storyId,
			updateStoryDto
		)
	}

	@Delete(':id/story/:storyId')
	async deleteStory(
		@Param('id') storiesId: string,
		@Param('storyId') storyId: string
	) {
		return this.storiesService.deleteStory(storiesId, storyId)
	}
}
