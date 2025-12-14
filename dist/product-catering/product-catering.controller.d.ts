import { ProductCateringService } from './product-catering.service';
import { ProductCateringDto } from './dto/product-catering.dto';
export declare class ProductCateringController {
    private readonly productCateringService;
    constructor(productCateringService: ProductCateringService);
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
