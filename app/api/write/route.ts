import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { writeFile } from "fs/promises";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const session = await getAuthSession();

    if (!session) {
      return NextResponse.json("Who R u ", { status: 404 });
    }

    const body = await req.formData();

    const title = body.get("title")?.toString() as string;
    const category: string = body.get("category")?.toString() as string;
    const slug: string = body.get("slug")?.toString() as string;
    const message = body.get("message")?.toString() as string;
    const image: File | null = body.get("image") as File;

    const fileBuffer = await (image as File).arrayBuffer();
    const buffer = Buffer.from(fileBuffer);
    let path = `${process.cwd()}/public/${crypto.randomUUID() + image.name}`;

    await writeFile(path, buffer);

    path = path.split(`${process.cwd()}/public`)[1];

    const post = await db.post.create({
      data: {
        title,
        desc: message,
        img: path,
        slug,
        catSlug: category,
        userEmail: session.user?.email as string,
      },
    });

    console.log(post," this is the post from the server side")

    return NextResponse.json(post, { status: 200 });
  } catch (error) {
    console.log("ERror in write");
    return NextResponse.json(error, { status: 500 });
  }
}
