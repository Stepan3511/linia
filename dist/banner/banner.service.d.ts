import { IBannerDto, IBanner } from './banner.interface';
import { FileService } from 'src/file/file.service';
export declare class BannerService {
    private readonly fileService;
    constructor(fileService: FileService);
    getBanner(): Promise<any>;
    updateBanner(dto: IBannerDto): Promise<IBanner>;
    uploadImage(file: Express.Multer.File): Promise<{
        banner: IBanner;
        url: string;
        name: string;
    }>;
}
