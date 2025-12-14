"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileStoriesModule = void 0;
const common_1 = require("@nestjs/common");
const file_stories_service_1 = require("./file-stories.service");
const file_stories_controller_1 = require("./file-stories.controller");
const serve_static_1 = require("@nestjs/serve-static");
const app_root_path_1 = require("app-root-path");
let FileStoriesModule = class FileStoriesModule {
};
exports.FileStoriesModule = FileStoriesModule;
exports.FileStoriesModule = FileStoriesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: `${app_root_path_1.path}/uploads`,
                serveRoot: `/uploads`
            })
        ],
        controllers: [file_stories_controller_1.FileStoriesController],
        providers: [file_stories_service_1.FileStoriesService]
    })
], FileStoriesModule);
//# sourceMappingURL=file-stories.module.js.map