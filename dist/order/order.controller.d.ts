import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { Request } from 'express';
export declare class OrderController {
    private readonly orderService;
    constructor(orderService: OrderService);
    createOrder(dto: CreateOrderDto, req: Request): Promise<{
        items: {
            name: string;
            price: number;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            productId: string;
            quantity: number;
            orderId: string;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        accountId: string;
        promoCodeId: string | null;
        totalAmount: number;
        status: import(".prisma/client").$Enums.OrderStatus;
    }>;
    getOrderHistory(req: Request): Promise<({
        promoCode: {
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
        };
        items: {
            name: string;
            price: number;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            productId: string;
            quantity: number;
            orderId: string;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        accountId: string;
        promoCodeId: string | null;
        totalAmount: number;
        status: import(".prisma/client").$Enums.OrderStatus;
    })[]>;
}
