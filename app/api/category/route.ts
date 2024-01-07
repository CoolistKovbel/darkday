import { db } from "@/lib/db";
import { NextResponse } from "next/server"

export async function GET(req: Request) { 
    try {
        const categories = await db.category.findMany()
        return NextResponse.json(categories, {status: 200});
    } catch (error) {
        // console.log(error)
        return NextResponse.json({message: "something when wrong in cat"}, {status: 500});
    }
}