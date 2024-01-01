import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function get(req: NextRequest, res: NextResponse) {
    try {
        const data = await db.post.findMany({
            where: {
                featured: true
            }
        });

        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
