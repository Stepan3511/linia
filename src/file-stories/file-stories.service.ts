import { Injectable } from "@nestjs/common";
import { path } from "app-root-path";
import { ensureDir, writeFile } from "fs-extra";
import { FileStoriesRasponse } from "./file-stories.interface";
import * as sharp from "sharp";

@Injectable()
export class FileStoriesService {
  async saveFile(file: Express.Multer.File, folder: string = "stories") {
    try {
      const uploadedFolder = `${path}/uploads/${folder}`;
      console.log(`Создание директории для загрузки: ${uploadedFolder}`);

      try {
        await ensureDir(uploadedFolder);
        console.log(`Директория создана или уже существует: ${uploadedFolder}`);
      } catch (dirError) {
        console.error(
          `Ошибка при создании директории ${uploadedFolder}:`,
          dirError
        );
        throw new Error(
          `Невозможно создать директорию для загрузки: ${dirError.message}. Проверьте права доступа.`
        );
      }

      const originalName = `${Date.now()}-${file.originalname}`;
      const resizedName = `resized-${originalName}`;

      // Проверка типа файла и выбор оптимального формата вывода
      let sharpInstance = sharp(file.buffer, {
        failOnError: false,
      }).resize(650, 910, { fit: "cover" });

      // Выбираем формат вывода в зависимости от типа входного файла
      if (file.mimetype === "image/png") {
        sharpInstance = sharpInstance.png({ quality: 90 });
      } else if (file.mimetype === "image/webp") {
        sharpInstance = sharpInstance.webp({ quality: 90 });
      } else {
        // Для JPEG и всех остальных форматов
        sharpInstance = sharpInstance.jpeg({ quality: 90 });
      }

      console.log("Обработка изображения для файла типа:", file.mimetype);
      const resizedBuffer = await sharpInstance.toBuffer();

      try {
        console.log(`Попытка записи файла в ${uploadedFolder}/${resizedName}`);
        await writeFile(`${uploadedFolder}/${resizedName}`, resizedBuffer);
        console.log(`Файл успешно записан: ${uploadedFolder}/${resizedName}`);
      } catch (writeError) {
        console.error(`Ошибка при записи файла:`, writeError);

        // Если ошибка связана с правами доступа
        if (writeError.code === "EACCES") {
          throw new Error(
            `Нет прав на запись в директорию ${uploadedFolder}. ` +
              `Выполните команду: chmod -R 777 ${uploadedFolder} или измените владельца директории.`
          );
        } else {
          throw new Error(`Ошибка при записи файла: ${writeError.message}`);
        }
      }

      const response: FileStoriesRasponse = {
        url: `/uploads/${folder}/${resizedName}`,
        name: resizedName,
      };

      console.log("Файл успешно сохранён:", response);

      return response;
    } catch (error) {
      console.error("Ошибка в FileStoriesService:", error);
      console.error("Стек вызовов:", error.stack);
      console.error("Тип файла:", file?.mimetype);
      console.error("Размер файла:", file?.size);
      throw new Error(`Ошибка обработки файла: ${error.message}`);
    }
  }
}
