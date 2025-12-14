"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileService = void 0;
const common_1 = require("@nestjs/common");
const app_root_path_1 = require("app-root-path");
const fs_extra_1 = require("fs-extra");
const promises_1 = require("fs/promises");
const sharp = require("sharp");
let FileService = class FileService {
    async saveFile(file, folder = 'products') {
        try {
            const uploadedFolder = `${app_root_path_1.path}/uploads/${folder}`;
            await (0, fs_extra_1.ensureDir)(uploadedFolder);
            const originalName = `${Date.now()}-${file.originalname}`;
            const resizedName = `resized-${originalName}`;
            const resizedBuffer = await sharp(file.buffer)
                .resize(500, 500, { fit: 'cover' })
                .toBuffer();
            await (0, promises_1.writeFile)(`${uploadedFolder}/${resizedName}`, resizedBuffer);
            const response = {
                url: `/uploads/${folder}/${resizedName}`,
                name: resizedName
            };
            console.log('Файл успешно сохранён:', response);
            return response;
        }
        catch (error) {
            console.error('Ошибка в FileService:', error.message);
            throw new Error('Ошибка обработки файла');
        }
    }
    async saveBannerImage(file, folder = 'banners') {
        try {
            const uploadedFolder = `${app_root_path_1.path}/uploads/${folder}`;
            await (0, fs_extra_1.ensureDir)(uploadedFolder);
            const originalName = `${Date.now()}-${file.originalname}`;
            await (0, promises_1.writeFile)(`${uploadedFolder}/${originalName}`, file.buffer);
            const response = {
                url: `/uploads/${folder}/${originalName}`,
                name: originalName
            };
            console.log('Изображение баннера успешно сохранено:', response);
            return response;
        }
        catch (error) {
            console.error('Ошибка в FileService при сохранении баннера:', error.message);
            throw new Error('Ошибка обработки изображения баннера');
        }
    }
};
exports.FileService = FileService;
exports.FileService = FileService = __decorate([
    (0, common_1.Injectable)()
], FileService);
//# sourceMappingURL=file.service.js.map