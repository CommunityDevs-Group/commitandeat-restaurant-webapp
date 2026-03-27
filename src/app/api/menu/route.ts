import { NextResponse } from "next/server";
import { getAllMenuData } from "@/services/menuService";


export async function GET() {
    try {
        const data = await getAllMenuData();


        return NextResponse.json({ data, error: null, message: "Success" });

    } catch (error: unknown) {
        
         const errorMessage = error instanceof Error ? error.message : "Menyu Yüklenmedi";
       
      

        return NextResponse.json(
            { 
              data:null,
              error:"Internal Server Error",
                message: errorMessage,
            }, 
            { status: 500 }
        );
    }
}







