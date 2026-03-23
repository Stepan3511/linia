"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileStoriesService = void 0;
const common_1 = require("@nestjs/common");
const app_root_path_1 = require("app-root-path");
const fs_extra_1 = require("fs-extra");
const sharp = require("sharp");
let FileStoriesService = class FileStoriesService {
    async saveFile(file, folder = "stories") {
        try {
            const uploadedFolder = `${app_root_path_1.path}/uploads/${folder}`;
            console.log(`Создание директории для загрузки: ${uploadedFolder}`);
            try {
                await (0, fs_extra_1.ensureDir)(uploadedFolder);
                console.log(`Директория создана или уже существует: ${uploadedFolder}`);
            }
            catch (dirError) {
                console.error(`Ошибка при создании директории ${uploadedFolder}:`, dirError);
                throw new Error(`Невозможно создать директорию для загрузки: ${dirError.message}. Проверьте права доступа.`);
            }
            const originalName = `${Date.now()}-${file.originalname}`;
            const resizedName = `resized-${originalName}`;
            let sharpInstance = sharp(file.buffer, {
                failOnError: false,
            }).resize(650, 910, { fit: "cover" });
            if (file.mimetype === "image/png") {
                sharpInstance = sharpInstance.png({ quality: 90 });
            }
            else if (file.mimetype === "image/webp") {
                sharpInstance = sharpInstance.webp({ quality: 90 });
            }
            else {
                sharpInstance = sharpInstance.jpeg({ quality: 90 });
            }
            console.log("Обработка изображения для файла типа:", file.mimetype);
            const resizedBuffer = await sharpInstance.toBuffer();
            try {
                console.log(`Попытка записи файла в ${uploadedFolder}/${resizedName}`);
                await (0, fs_extra_1.writeFile)(`${uploadedFolder}/${resizedName}`, resizedBuffer);
                console.log(`Файл успешно записан: ${uploadedFolder}/${resizedName}`);
            }
            catch (writeError) {
                console.error(`Ошибка при записи файла:`, writeError);
                if (writeError.code === "EACCES") {
                    throw new Error(`Нет прав на запись в директорию ${uploadedFolder}. ` +
                        `Выполните команду: chmod -R 777 ${uploadedFolder} или измените владельца директории.`);
                }
                else {
                    throw new Error(`Ошибка при записи файла: ${writeError.message}`);
                }
            }
            const response = {
                url: `/uploads/${folder}/${resizedName}`,
                name: resizedName,
            };
            console.log("Файл успешно сохранён:", response);
            return response;
        }
        catch (error) {
            console.error("Ошибка в FileStoriesService:", error);
            console.error("Стек вызовов:", error.stack);
            console.error("Тип файла:", file?.mimetype);
            console.error("Размер файла:", file?.size);
            throw new Error(`Ошибка обработки файла: ${error.message}`);
        }
    }
};
exports.FileStoriesService = FileStoriesService;
exports.FileStoriesService = FileStoriesService = __decorate([
    (0, common_1.Injectable)()
], FileStoriesService);
//# sourceMappingURL=file-stories.service.js.map