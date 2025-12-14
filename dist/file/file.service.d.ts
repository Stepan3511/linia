import { FileRasponse } from './file.interface';
export declare class FileService {
    saveFile(file: Express.Multer.File, folder?: string): Promise<FileRasponse>;
    saveBannerImage(file: Express.Multer.File, folder?: string): Promise<FileRasponse>;
}
