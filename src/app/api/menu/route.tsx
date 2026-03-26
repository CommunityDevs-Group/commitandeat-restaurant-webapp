import { NextResponse } from "next/server";
import { getAllMenuData } from "@/services/menuService";

// export async function GET() {

//     try{
//         const data = await getAllMenuData();


//         return NextResponse.json({
//             data, 
//             count: data.length 
//         }, {status:200});
        
        
//     }catch(error) {
//         return NextResponse.json(
//             {error: "Internal Server Error", message : "Menyu Yuklenmedi"},
//             {status:500}
//         )
//     }
// }

// src/app/api/menu/route.ts
export async function GET() {
    try {
        const data = await getAllMenuData();
        return NextResponse.json({ data, count: data.length });
    } catch (error: any) {
        // HATAYI BURADA TERMİNALDE GÖRMEK İÇİN:
        console.log("--- BACKEND HATASI BAŞLADI ---");
        console.error(error);
        console.log("--- BACKEND HATASI BİTTİ ---");

        return NextResponse.json(
            { 
                error: "Detaylı Hata", 
                message: error.message // Hatayı direkt ekrana yazdırıyoruz
            }, 
            { status: 500 }
        );
    }
}