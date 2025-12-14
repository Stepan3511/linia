import { PrismaService } from 'src/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { JwtService } from '@nestjs/jwt';
export declare class OrderService {
    private readonly prismaService;
    private readonly jwtService;
    constructor(prismaService: PrismaService, jwtService: JwtService);
    createOrder(dto: CreateOrderDto, token: string): Promise<{
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
    getOrderHistory(token: string): Promise<({
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
