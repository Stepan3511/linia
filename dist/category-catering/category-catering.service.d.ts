import { PrismaService } from 'src/prisma.service';
import { CategoryCateringDto } from './dto/category-catering.dto';
export declare class CategoryCateringService {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    getAll(): Promise<({
        ProductCatering: {
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
        }[];
    } & {
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        position: number;
    })[]>;
    getById(id: string): Promise<{
        ProductCatering: {
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
        }[];
    } & {
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        position: number;
    }>;
    create(dto: CategoryCateringDto): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        position: number;
    }>;
    update(id: string, dto: CategoryCateringDto): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        position: number;
    }>;
    delete(id: string): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        position: number;
    }>;
}
