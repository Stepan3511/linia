"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoriesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let StoriesService = class StoriesService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createStoriesDto) {
        const { name, description, stories } = createStoriesDto;
        return this.prisma.stories.create({
            data: {
                name,
                description,
                stories: {
                    create: stories?.map(story => ({
                        image: story.image
                    })) || []
                }
            },
            include: { stories: true }
        });
    }
    async findAll() {
        return this.prisma.stories.findMany({
            include: { stories: true }
        });
    }
    async findOne(id) {
        return this.prisma.stories.findUnique({
            where: { id },
            include: { stories: true }
        });
    }
    async delete(id) {
        return this.prisma.stories.delete({
            where: { id }
        });
    }
    async update(id, updateStoriesDto) {
        const { name, description, stories } = updateStoriesDto;
        const existingStories = stories?.filter(story => story.id);
        const newStories = stories?.filter(story => !story.id);
        return this.prisma.stories.update({
            where: { id },
            data: {
                name,
                description,
                stories: {
                    upsert: existingStories?.map(story => ({
                        where: { id: story.id },
                        create: { image: story.image },
                        update: { image: story.image }
                    })),
                    create: newStories?.map(story => ({
                        image: story.image
                    }))
                }
            },
            include: { stories: true }
        });
    }
    async addStory(storiesId, createStoryDto) {
        const { image } = createStoryDto;
        return this.prisma.story.create({
            data: {
                image,
                storiesId
            }
        });
    }
    async updateStory(storiesId, storyId, updateStoryDto) {
        const { image } = updateStoryDto;
        return this.prisma.story.update({
            where: { id: storyId },
            data: {
                image,
                storiesId
            }
        });
    }
    async deleteStory(storiesId, storyId) {
        return this.prisma.story.delete({
            where: { id: storyId }
        });
    }
};
exports.StoriesService = StoriesService;
exports.StoriesService = StoriesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], StoriesService);
//# sourceMappingURL=stories.service.js.map