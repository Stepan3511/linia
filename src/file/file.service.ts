import { Injectable } from '@nestjs/common'
import { path } from 'app-root-path'
import { ensureDir } from 'fs-extra'
import { writeFile } from 'fs/promises'
import { FileRasponse } from './file.interface'
import * as sharp from 'sharp'

@Injectable()
export class FileService {
	async saveFile(file: Express.Multer.File, folder: string = 'products') {
		try {
			const uploadedFolder = `${path}/uploads/${folder}`

			await ensureDir(uploadedFolder)

			const originalName = `${Date.now()}-${file.originalname}`
			const resizedName = `resized-${originalName}`

			const resizedBuffer = await sharp(file.buffer)
				.resize(500, 500, { fit: 'cover' })
				.toBuffer()

			await writeFile(`${uploadedFolder}/${resizedName}`, resizedBuffer)

			const response: FileRasponse = {
				url: `/uploads/${folder}/${resizedName}`,
				name: resizedName
			}

			console.log('Файл успешно сохранён:', response)

			return response
		} catch (error) {
			console.error('Ошибка в FileService:', error.message)
			throw new Error('Ошибка обработки файла')
		}
	}

	async saveBannerImage(
		file: Express.Multer.File,
		folder: string = 'banners'
	) {
		try {
			const uploadedFolder = `${path}/uploads/${folder}`

			await ensureDir(uploadedFolder)

			const originalName = `${Date.now()}-${file.originalname}`

			await writeFile(`${uploadedFolder}/${originalName}`, file.buffer)

			const response: FileRasponse = {
				url: `/uploads/${folder}/${originalName}`,
				name: originalName
			}

			console.log('Изображение баннера успешно сохранено:', response)

			return response
		} catch (error) {
			console.error(
				'Ошибка в FileService при сохранении баннера:',
				error.message
			)
			throw new Error('Ошибка обработки изображения баннера')
		}
	}
}
