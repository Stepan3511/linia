import { PrismaService } from 'src/prisma.service';
import { CategoryDeliveryDto } from './dto/category-delivery.dto';
export declare class CategoryDeliveryService {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    getAll(): Promise<({
        ProductDelivery: {
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
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        position: number;
    })[]>;
    getById(id: string): Promise<{
        ProductDelivery: {
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
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        position: number;
    }>;
    create(dto: CategoryDeliveryDto): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        position: number;
    }>;
    update(id: string, dto: CategoryDeliveryDto): Promise<{
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
