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
exports.BannerService = void 0;
const common_1 = require("@nestjs/common");
const file_service_1 = require("../file/file.service");
const app_root_path_1 = require("app-root-path");
const fs_extra_1 = require("fs-extra");
const uuid_1 = require("uuid");
const BANNER_FILE_PATH = `${app_root_path_1.path}/uploads/banner/banner-data.json`;
let BannerService = class BannerService {
    constructor(fileService) {
        this.fileService = fileService;
    }
    async getBanner() {
        try {
            await (0, fs_extra_1.ensureDir)(`${app_root_path_1.path}/uploads/banner`);
            try {
                const banner = await (0, fs_extra_1.readJSON)(BANNER_FILE_PATH);
                return banner;
            }
            catch (error) {
                const newBanner = {
                    id: (0, uuid_1.v4)(),
                    isActive: false,
                    imageUrl: ''
                };
                await (0, fs_extra_1.writeJSON)(BANNER_FILE_PATH, newBanner);
                return newBanner;
            }
        }
        catch (error) {
            console.error('Ошибка при получении баннера:', error.message);
            throw new Error('Не удалось получить данные баннера');
        }
    }
    async updateBanner(dto) {
        try {
            await (0, fs_extra_1.ensureDir)(`${app_root_path_1.path}/uploads/banner`);
            let banner;
            try {
                banner = await (0, fs_extra_1.readJSON)(BANNER_FILE_PATH);
            }
            catch (error) {
                banner = {
                    id: (0, uuid_1.v4)(),
                    isActive: false,
                    imageUrl: ''
                };
            }
            const updatedBanner = {
                ...banner,
                isActive: dto.isActive,
                ...(dto.imageUrl && { imageUrl: dto.imageUrl }),
                ...(dto.linkUrl !== undefined && { linkUrl: dto.linkUrl })
            };
            await (0, fs_extra_1.writeJSON)(BANNER_FILE_PATH, updatedBanner);
            return updatedBanner;
        }
        catch (error) {
            console.error('Ошибка при обновлении баннера:', error.message);
            throw new Error('Не удалось обновить данные баннера');
        }
    }
    async uploadImage(file) {
        const savedFile = await this.fileService.saveBannerImage(file, 'banners');
        let banner;
        try {
            await (0, fs_extra_1.ensureDir)(`${app_root_path_1.path}/uploads/banner`);
            banner = await (0, fs_extra_1.readJSON)(BANNER_FILE_PATH);
        }
        catch (error) {
            banner = {
                id: (0, uuid_1.v4)(),
                isActive: false,
                imageUrl: ''
            };
        }
        const updatedBanner = {
            ...banner,
            imageUrl: savedFile.url
        };
        await (0, fs_extra_1.writeJSON)(BANNER_FILE_PATH, updatedBanner);
        return {
            ...savedFile,
            banner: updatedBanner
        };
    }
};
exports.BannerService = BannerService;
exports.BannerService = BannerService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [file_service_1.FileService])
], BannerService);
//# sourceMappingURL=banner.service.js.map