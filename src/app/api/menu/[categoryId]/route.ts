import { NextResponse } from "next/server";
import { getCategoryItems } from "@/services/menuService";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ categoryId: string }> }
) {
  try {
    const { categoryId } = await params;

    const data = await getCategoryItems(categoryId);

    if (!data || data.length === 0) {
      return NextResponse.json(
        { data: null,count:0, error: "Not Found", message: "Category not found or empty" },
        { status: 404 }
      );
    }

    return NextResponse.json({ data,count:data.length, error: null, message: "Success" });

  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Data retrieval failed";
    
    return NextResponse.json(
      { 
        data: null, 
        count: 0,
        error: "Internal Server Error", 
        message: errorMessage,
      }, 
      { status: 500 }
    );
  }
}





