import { getAuthSession } from "@/lib/auth"
import { db } from "@/lib/db"
import { NextResponse } from "next/server"

 
// Get All Comments
export const GET = async (req: Request) => {

    const { searchParams } = new URL(req.url)

    const postSlug = searchParams.get("postSlug")

    try {

        const comments = await db.comment.findMany({
            where: {
                ...(postSlug && {postSlug}),
            },
            include: {user: true}
        })

        console.log(comments)

        return NextResponse.json(comments, {status:200})
        
    } catch (error) {
        console.log("error")
        return NextResponse.json(error, {status: 500})
    }


}

export const POST = async (req: Request) => {
    const session = await getAuthSession();

    if(!session) {
        return NextResponse.json("not authenticated", {status:401})
    }

    try {

        const body = await req.json()

        const comm = await db.comment.create({
            data:{
                desc: body?.values?.comment,
                userEmail: session?.user?.email || "",
                postSlug: body?.postSlug
            }
        })
        
        

        return NextResponse.json(comm.toString(), {status:200})
        
    } catch (error) {
        console.log(error)
        return NextResponse.json("error in comment post route", {status:500})
    }

}