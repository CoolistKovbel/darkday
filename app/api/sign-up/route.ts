import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import { db } from "@/lib/db";
import { writeFile } from "fs/promises";

interface UserCreateData {
  username: string;
  email: string;
  password: string; // Assuming hashedPassword is a string
  MetaAddress: string; // Assuming metaAddress is a string
  image: string; // Assuming path is a string
}

export async function POST(req: Request) {
  try {
    console.log("hello from server");

    const body = await req.formData();

    console.log(body);

    const username = body.get("username")?.toString() as string;
    let password: string = body.get("password")?.toString() as string;
    const email = body.get("email")?.toString() as string;
    const metaAddress = body.get("metaAddress") as string;
    const image: File | null = body.get("image") as File;

    const fileBuffer = await (image as File).arrayBuffer();
    const buffer = Buffer.from(fileBuffer);

    let path = `${process.cwd()}/public/${crypto.randomUUID() + image.name}`;

    await writeFile(path, buffer);

    path = path.split(`${process.cwd()}/public/`)[1];

    const existingUserbyEmail = await db.user.findUnique({
      where: { email },
    });

    const existingUserbyUsername = await db.user.findUnique({
      where: { username: username },
    });

    const existingEdress = await db.user.findUnique({
      where: { MetaAddress: metaAddress },
    });

    if (existingUserbyEmail || existingUserbyUsername) {
      return NextResponse.json("need a better name buddy", { status: 409 });
    }

    if (existingEdress) {
      return NextResponse.json("Need another address", { status: 409 });
    }

    const hashedPassword = await hash(password, 10);

    const newUser = await db.user.create({
      data: {
        username: username,
        email: email,
        password: hashedPassword,
        MetaAddress: metaAddress,
        image: path,
      } as UserCreateData,
    });

    const { password: newUserPassword, ...rest } = newUser;

    return NextResponse.json(rest, { status: 200 });
  } catch (error) {
    console.log(error);
  }
}
