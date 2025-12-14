import { FileStoriesService } from './file-stories.service';
export declare class FileStoriesController {
    private readonly fileStoriesService;
    constructor(fileStoriesService: FileStoriesService);
    saveFile(file: Express.Multer.File, folder?: string): Promise<import("./file-stories.interface").FileStoriesRasponse>;
}
