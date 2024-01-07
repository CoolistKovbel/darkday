import { db } from "@/lib/db"
import { NextResponse } from "next/server"

export async function GET(req:Request) {
    try {


        const res = await db.post.findMany({
            orderBy: {
                views: 'desc'
            },
            include: {
                user: true
            }
        })


        return NextResponse.json(res, {status: 200})
        
    } catch (error) {
        // console.log("Error in popular route")
        return NextResponse.json(error, { status: 500})
    }
}