
import { prisma } from "../src/lib/prisma";


async function main() {
    await prisma.menuCategory.deleteMany();
    await prisma.menuItem.deleteMany();


    await prisma.menuCategory.create({
        data: {
            name: "Starter",
            isActive: true,
            sortOrder: 1,
            items: {
                create: [
                    {
                        name: "California Sushi Roll",
                        description: "The alluring point of your love for sushi! Our signature dish, prepared with the finest ingredients.",
                        price: 10,
                        isAvailable: true
                    },
                    {
                        name: "Veggie-Grill",
                        description: "Golden grilled of meat, spicy rice and fresh vegetables. A signature flavor balanced with our special sauce.",
                        price: 10,
                        isAvailable: true
                    },
                    {
                        name: "Uttapam",
                        description: "Layers of spicy vegetables, touches of fresh produce, and a special dipping sauce served alongside.",
                        price: 10,
                        isAvailable: true
                    },
                ],
            },
        },
    });

    await prisma.menuCategory.create({
        data: {
            name: "Main courses",
            isActive: true,
            sortOrder: 2,
            items: {
                create: [
                    { name: "Steak dinner", description: "Delicious steak", price: 25, isAvailable: true },
                    { name: "Roasted Chicken", description: "Crispy chicken", price: 18, isAvailable: true },
                    { name: "Grilled Fish", description: "Sea bass", price: 22, isAvailable: true },
                ],
            },
        },
    });


    await prisma.menuCategory.create({
        data: {
            name: "Beverages",
            isActive: true,
            sortOrder: 3,
            items: {
                create: [
                    { name: "Classic Mojito", description: "Cool and refreshing", price: 8, isAvailable: true },
                    { name: "Fruit Punch", description: "Mixed fruits", price: 6, isAvailable: true },
                    { name: "Mineral Water", description: "Sparkling", price: 3, isAvailable: true },
                ],
            },
        },
    });

}


main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });







