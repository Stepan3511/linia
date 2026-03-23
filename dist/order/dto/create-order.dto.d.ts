export declare class CreateOrderItemDto {
    productId: string;
    quantity: number;
    price: number;
    name: string;
}
export declare class CreateOrderDto {
    promoCodeId?: string;
    items: CreateOrderItemDto[];
    totalAmount: number;
    name?: string;
    phone?: string;
    address?: string;
    deliveryOption?: string;
    isDelivery?: boolean;
    paymentMethod?: string;
}
