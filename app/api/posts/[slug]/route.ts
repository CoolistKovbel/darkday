
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

interface GetRequest {
    params: { [key: string]: string }; // Assuming params is an object with string keys and string values
  }

// GET SINGLE POST
export const GET = async (req: Request, { params }:GetRequest ) => {
  const { slug } = params;

  try {
    const post = await db.post.update({
      where: { slug },
      data: { views: { increment: 1 } },
      include: { user: true },
    });

    return NextResponse.json(post, {status: 200});
  } catch (err) {
    // console.log(err);
    return NextResponse.json({err: 'in posts {1}'}, {status: 500})
  }
};