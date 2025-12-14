import { Injectable } from '@nestjs/common'
import { IBannerDto, IBanner } from './banner.interface'
import { FileService } from 'src/file/file.service'
import { path } from 'app-root-path'
import { ensureDir, readJSON, writeJSON } from 'fs-extra'
import { v4 as uuidv4 } from 'uuid'

const BANNER_FILE_PATH = `${path}/uploads/banner/banner-data.json`

@Injectable()
export class BannerService {
	constructor(private readonly fileService: FileService) {}

	async getBanner() {
		try {
			await ensureDir(`${path}/uploads/banner`)

			try {
				const banner = await readJSON(BANNER_FILE_PATH)
				return banner
			} catch (error) {
				// Если файл не найден или произошла ошибка чтения, создаем пустой баннер
				const newBanner: IBanner = {
					id: uuidv4(),
					isActive: false,
					imageUrl: ''
				}

				await writeJSON(BANNER_FILE_PATH, newBanner)
				return newBanner
			}
		} catch (error) {
			console.error('Ошибка при получении баннера:', error.message)
			throw new Error('Не удалось получить данные баннера')
		}
	}

	async updateBanner(dto: IBannerDto) {
		try {
			await ensureDir(`${path}/uploads/banner`)

			let banner: IBanner

			try {
				banner = await readJSON(BANNER_FILE_PATH)
			} catch (error) {
				// Если файл не найден, создаем новый баннер
				banner = {
					id: uuidv4(),
					isActive: false,
					imageUrl: ''
				}
			}

			// Обновляем баннер
			const updatedBanner: IBanner = {
				...banner,
				isActive: dto.isActive,
				...(dto.imageUrl && { imageUrl: dto.imageUrl }),
				...(dto.linkUrl !== undefined && { linkUrl: dto.linkUrl })
			}

			await writeJSON(BANNER_FILE_PATH, updatedBanner)
			return updatedBanner
		} catch (error) {
			console.error('Ошибка при обновлении баннера:', error.message)
			throw new Error('Не удалось обновить данные баннера')
		}
	}

	async uploadImage(file: Express.Multer.File) {
		const savedFile = await this.fileService.saveBannerImage(
			file,
			'banners'
		)

		// Получаем текущие данные баннера
		let banner: IBanner
		try {
			await ensureDir(`${path}/uploads/banner`)
			banner = await readJSON(BANNER_FILE_PATH)
		} catch (error) {
			// Если файл не найден, создаем новый баннер
			banner = {
				id: uuidv4(),
				isActive: false,
				imageUrl: ''
			}
		}

		// Обновляем URL изображения в объекте баннера
		const updatedBanner: IBanner = {
			...banner,
			imageUrl: savedFile.url
		}

		// Сохраняем обновленный объект баннера
		await writeJSON(BANNER_FILE_PATH, updatedBanner)

		// Возвращаем информацию о сохраненном файле и обновленном баннере
		return {
			...savedFile,
			banner: updatedBanner
		}
	}
}
