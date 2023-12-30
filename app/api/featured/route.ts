import { db } from "@/lib/db"
import { NextResponse } from "next/server"

export async function GET(res:Response) {
    try {


        const res = await db.post.findMany({
            where:{
                featured: true
            }
        })


        return NextResponse.json(res, {status: 200})

        
    } catch (error) {
        console.log("Error")
        return NextResponse.json(error, {status: 500})
    }
}