import { PrismaService } from 'src/prisma.service';
import { ProductDeliveryDto } from './dto/product-delivery.dto';
export declare class ProductDeliveryService {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    getAll(): Promise<({
        category: {
            name: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            position: number;
        };
    } & {
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
    })[]>;
    getById(id: string): Promise<{
        category: {
            name: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            position: number;
        };
    } & {
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
    }>;
    getByCategory(categoryId: string): Promise<({
        category: {
            name: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            position: number;
        };
    } & {
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
    })[]>;
    create(dto: ProductDeliveryDto): Promise<{
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
    }>;
    update(id: string, dto: ProductDeliveryDto): Promise<{
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
    }>;
    delete(id: string): Promise<{
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
    }>;
}
