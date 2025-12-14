import { PrismaService } from 'src/prisma.service';
import { PromoCodeDto } from './dto/promo-code.dto';
export declare class PromoCodeService {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    getAll(): Promise<({
        products: {
            name: string;
            description: string | null;
            weight: number | null;
            pieces: number | null;
            price: number | null;
            image: string | null;
            categoryId: string | null;
            cateringCart: boolean;
            deliveryCart: boolean;
            id: string;
            createdAt: Date;
            updatedAt: Date;
        }[];
    } & {
        name: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        minPrice: number | null;
        isArchive: boolean;
    })[]>;
    getById(id: string): Promise<{
        products: {
            name: string;
            description: string | null;
            weight: number | null;
            pieces: number | null;
            price: number | null;
            image: string | null;
            categoryId: string | null;
            cateringCart: boolean;
            deliveryCart: boolean;
            id: string;
            createdAt: Date;
            updatedAt: Date;
        }[];
    } & {
        name: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        minPrice: number | null;
        isArchive: boolean;
    }>;
    create(dto: PromoCodeDto): Promise<{
        products: {
            name: string;
            description: string | null;
            weight: number | null;
            pieces: number | null;
            price: number | null;
            image: string | null;
            categoryId: string | null;
            cateringCart: boolean;
            deliveryCart: boolean;
            id: string;
            createdAt: Date;
            updatedAt: Date;
        }[];
    } & {
        name: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        minPrice: number | null;
        isArchive: boolean;
    }>;
    update(id: string, dto: PromoCodeDto): Promise<{
        products: {
            name: string;
            description: string | null;
            weight: number | null;
            pieces: number | null;
            price: number | null;
            image: string | null;
            categoryId: string | null;
            cateringCart: boolean;
            deliveryCart: boolean;
            id: string;
            createdAt: Date;
            updatedAt: Date;
        }[];
    } & {
        name: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        minPrice: number | null;
        isArchive: boolean;
    }>;
    delete(id: string): Promise<{
        name: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        minPrice: number | null;
        isArchive: boolean;
    }>;
    archive(id: string): Promise<{
        name: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        minPrice: number | null;
        isArchive: boolean;
    }>;
    getArchived(): Promise<({
        products: {
            name: string;
            description: string | null;
            weight: number | null;
            pieces: number | null;
            price: number | null;
            image: string | null;
            categoryId: string | null;
            cateringCart: boolean;
            deliveryCart: boolean;
            id: string;
            createdAt: Date;
            updatedAt: Date;
        }[];
    } & {
        name: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        minPrice: number | null;
        isArchive: boolean;
    })[]>;
    restoreFromArchive(id: string): Promise<{
        name: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        minPrice: number | null;
        isArchive: boolean;
    }>;
}
