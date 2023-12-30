import { db } from "@/lib/db";
import { NextResponse } from "next/server"

export async function GET(req: Request) { 
    try {
        const categories = await db.category.findMany()
        console.log(categories)
        return NextResponse.json(categories, {status: 200});
    } catch (error) {
        console.log("error in route cat")
        return NextResponse.json({message: "something when wrong"}, {status: 500});
    }
}