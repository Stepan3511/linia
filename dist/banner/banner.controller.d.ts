import { BannerService } from './banner.service';
import { IBannerDto } from './banner.interface';
export declare class BannerController {
    private readonly bannerService;
    constructor(bannerService: BannerService);
    getBanner(): Promise<any>;
    updateBanner(dto: IBannerDto): Promise<import("./banner.interface").IBanner>;
    patchBanner(dto: IBannerDto): Promise<import("./banner.interface").IBanner>;
    uploadImage(file: Express.Multer.File): Promise<{
        banner: import("./banner.interface").IBanner;
        url: string;
        name: string;
    }>;
}
