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
exports.UpdateStoriesDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_stories_dto_1 = require("./create-stories.dto");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const create_story_dto_1 = require("./create-story.dto");
class UpdateStoriesDto extends (0, mapped_types_1.PartialType)(create_stories_dto_1.CreateStoriesDto) {
}
exports.UpdateStoriesDto = UpdateStoriesDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateStoriesDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateStoriesDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => create_story_dto_1.CreateStoryDto),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], UpdateStoriesDto.prototype, "stories", void 0);
//# sourceMappingURL=update-stories.dto.js.map