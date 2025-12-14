"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const fs = require("fs");
const prisma = new client_1.PrismaClient();
async function main() {
    const data = JSON.parse(fs.readFileSync('data_stories.json', 'utf-8'));
    for (const group of data) {
        await prisma.stories.create({
            data: {
                name: group.name.trim(),
                description: group.description || null,
                stories: {
                    create: group.stories.map((story) => ({
                        image: story.image || '/uploads/images/stories/default.png'
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
//# sourceMappingURL=seed-stories.js.map