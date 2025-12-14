import { PrismaService } from 'src/prisma.service';
import { ProductCateringDto } from './dto/product-catering.dto';
export declare class ProductCateringService {
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
        price: number | null;
        image: string | null;
        categoryId: string | null;
        cateringCart: boolean;
        deliveryCart: boolean;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        minOrder: number;
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
        price: number | null;
        image: string | null;
        categoryId: string | null;
        cateringCart: boolean;
        deliveryCart: boolean;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        minOrder: number;
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
        price: number | null;
        image: string | null;
        categoryId: string | null;
        cateringCart: boolean;
        deliveryCart: boolean;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        minOrder: number;
    })[]>;
    create(dto: ProductCateringDto): Promise<{
        name: string;
        description: string | null;
        weight: number | null;
        price: number | null;
        image: string | null;
        categoryId: string | null;
        cateringCart: boolean;
        deliveryCart: boolean;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        minOrder: number;
    }>;
    update(id: string, dto: ProductCateringDto): Promise<{
        name: string;
        description: string | null;
        weight: number | null;
        price: number | null;
        image: string | null;
        categoryId: string | null;
        cateringCart: boolean;
        deliveryCart: boolean;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        minOrder: number;
    }>;
    delete(id: string): Promise<{
        name: string;
        description: string | null;
        weight: number | null;
        price: number | null;
        image: string | null;
        categoryId: string | null;
        cateringCart: boolean;
        deliveryCart: boolean;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        minOrder: number;
    }>;
}
