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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoriesController = void 0;
const common_1 = require("@nestjs/common");
const stories_service_1 = require("./stories.service");
const create_stories_dto_1 = require("./dto/create-stories.dto");
const create_story_dto_1 = require("./dto/create-story.dto");
const update_stories_dto_1 = require("./dto/update-stories.dto");
let StoriesController = class StoriesController {
    constructor(storiesService) {
        this.storiesService = storiesService;
    }
    async create(createStoriesDto) {
        return this.storiesService.create(createStoriesDto);
    }
    async findAll() {
        return this.storiesService.findAll();
    }
    async findOne(id) {
        return this.storiesService.findOne(id);
    }
    async update(id, updateStoriesDto) {
        return this.storiesService.update(id, updateStoriesDto);
    }
    async delete(id) {
        return this.storiesService.delete(id);
    }
    async addStory(storiesId, createStoryDto) {
        return this.storiesService.addStory(storiesId, createStoryDto);
    }
    async updateStory(storiesId, storyId, updateStoryDto) {
        return this.storiesService.updateStory(storiesId, storyId, updateStoryDto);
    }
    async deleteStory(storiesId, storyId) {
        return this.storiesService.deleteStory(storiesId, storyId);
    }
};
exports.StoriesController = StoriesController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_stories_dto_1.CreateStoriesDto]),
    __metadata("design:returntype", Promise)
], StoriesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], StoriesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StoriesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_stories_dto_1.UpdateStoriesDto]),
    __metadata("design:returntype", Promise)
], StoriesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StoriesController.prototype, "delete", null);
__decorate([
    (0, common_1.Post)(':id/story'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_story_dto_1.CreateStoryDto]),
    __metadata("design:returntype", Promise)
], StoriesController.prototype, "addStory", null);
__decorate([
    (0, common_1.Patch)(':id/story/:storyId'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('storyId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, create_story_dto_1.CreateStoryDto]),
    __metadata("design:returntype", Promise)
], StoriesController.prototype, "updateStory", null);
__decorate([
    (0, common_1.Delete)(':id/story/:storyId'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('storyId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], StoriesController.prototype, "deleteStory", null);
exports.StoriesController = StoriesController = __decorate([
    (0, common_1.Controller)('stories'),
    __metadata("design:paramtypes", [stories_service_1.StoriesService])
], StoriesController);
//# sourceMappingURL=stories.controller.js.map