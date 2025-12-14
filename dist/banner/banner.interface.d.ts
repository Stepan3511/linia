export interface IBanner {
    id: string;
    isActive: boolean;
    imageUrl: string;
    linkUrl?: string;
}
export interface IBannerDto {
    isActive: boolean;
    linkUrl?: string;
    imageUrl?: string;
}
