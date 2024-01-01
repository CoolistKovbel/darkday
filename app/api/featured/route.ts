
import { db } from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function GET(req: NextApiRequest, res: NextApiResponse) {
   
        try {
            const data = await db.post.findMany({
                where: {
                    featured: true
                }
            });
    
            return res.status(200).json(data);
        } catch (error) {
            console.error("Error:", error);
            return res.status(500).json({ error: "Internal Server Error" });
        }

}
