import { prisma } from "@/lib/prisma";

export async function getAllMenuData() {
    return await prisma.menuCategory.findMany({
        where:{ isActive: true },
        orderBy: {sortOrder: 'asc'},
        include:{
            items:{
                where:{ isAvailable: true},
                orderBy:{ name: 'asc'}
            }
        }

    })
}

export async function getCategoryItems(categoryId:string) {
    return await prisma.menuItem.findMany({
        where:{
            categoryId: categoryId,
            isAvailable:true

        },
        orderBy:{ name:'asc'}
    })



}








