"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const fs = require("fs");
const prisma = new client_1.PrismaClient();
async function main() {
    const data = JSON.parse(fs.readFileSync('data_catering.json', 'utf-8'));
    for (const category of data) {
        await prisma.categoryCatering.create({
            data: {
                name: category.name,
                position: category.position,
                ProductCatering: {
                    create: category.products.map((product) => ({
                        name: product.name,
                        description: product.description,
                        weight: product.weight,
                        price: product.price,
                        minOrder: product.minOrder,
                        image: product.image || '/uploads/catering/default.png'
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
//# sourceMappingURL=seed-catering.js.map