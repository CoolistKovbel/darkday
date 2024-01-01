
import { db } from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export default async function GET(req: NextApiRequest, res: NextApiResponse) {
   
        try {
            const data = await db.post.findMany({
                where: {
                    featured: true
                }
            });
    
            return NextResponse.json(data, {status: 200});
        } catch (error) {
            console.error("Error:", error);
            return res.json({ error: "Internal Server Error" , status: 500});
        }

}
