import { FileStoriesRasponse } from './file-stories.interface';
export declare class FileStoriesService {
    saveFile(file: Express.Multer.File, folder?: string): Promise<FileStoriesRasponse>;
}
