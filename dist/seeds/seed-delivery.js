"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const fs = require("fs");
const prisma = new client_1.PrismaClient();
async function main() {
    const data = JSON.parse(fs.readFileSync('data_delivery.json', 'utf-8'));
    for (const category of data) {
        await prisma.categoryDelivery.create({
            data: {
                name: category.name,
                position: category.position,
                ProductDelivery: {
                    create: category.products.map((product) => ({
                        name: product.name,
                        description: product.description,
                        weight: product.weight,
                        pieces: product.pieces,
                        price: product.price,
                        image: product.image || '/uploads/delivery/default.png',
                        cateringCart: product.catering_cart,
                        deliveryCart: product.delivery_cart
                    }))
                }
            }
        });
    }
}
main()
    .catch(e => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed-delivery.js.map