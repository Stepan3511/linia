import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { CreateStoriesDto } from './dto/create-stories.dto'
import { CreateStoryDto } from './dto/create-story.dto'
import { UpdateStoriesDto } from './dto/update-stories.dto'

@Injectable()
export class StoriesService {
	constructor(private prisma: PrismaService) {}

	async create(createStoriesDto: CreateStoriesDto) {
		const { name, description, stories } = createStoriesDto

		return this.prisma.stories.create({
			data: {
				name,
				description,
				stories: {
					create:
						stories?.map(story => ({
							image: story.image
						})) || []
				}
			},
			include: { stories: true }
		})
	}

	async findAll() {
		return this.prisma.stories.findMany({
			include: { stories: true }
		})
	}

	async findOne(id: string) {
		return this.prisma.stories.findUnique({
			where: { id },
			include: { stories: true }
		})
	}

	async delete(id: string) {
		return this.prisma.stories.delete({
			where: { id }
		})
	}

	async update(id: string, updateStoriesDto: UpdateStoriesDto) {
		const { name, description, stories } = updateStoriesDto

		// Разделяем истории на новые и существующие
		const existingStories = stories?.filter(story => story.id)
		const newStories = stories?.filter(story => !story.id)

		return this.prisma.stories.update({
			where: { id },
			data: {
				name,
				description,
				// Обновляем существующие истории через `upsert`
				stories: {
					upsert: existingStories?.map(story => ({
						where: { id: story.id },
						create: { image: story.image },
						update: { image: story.image }
					})),
					// Добавляем новые истории через `createMany`
					create: newStories?.map(story => ({
						image: story.image
					}))
				}
			},
			include: { stories: true }
		})
	}

	// Добавление сторис в существующую группу
	async addStory(storiesId: string, createStoryDto: CreateStoryDto) {
		const { image } = createStoryDto

		return this.prisma.story.create({
			data: {
				image,
				storiesId
			}
		})
	}

	// Обновление отдельной сторис
	async updateStory(
		storiesId: string,
		storyId: string,
		updateStoryDto: CreateStoryDto
	) {
		const { image } = updateStoryDto

		return this.prisma.story.update({
			where: { id: storyId },
			data: {
				image,
				storiesId
			}
		})
	}

	// Удаление отдельной сторис
	async deleteStory(storiesId: string, storyId: string) {
		return this.prisma.story.delete({
			where: { id: storyId }
		})
	}
}
