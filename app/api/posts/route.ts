import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";

import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  const { searchParams } = new URL(req.url);

  const page = searchParams.get("page") as any;
  const cat = searchParams.get("cat");

  const POST_PER_PAGE = 3;

  const query = {
    take: POST_PER_PAGE,
    skip: POST_PER_PAGE * (page - 1),
    where: {
      ...(cat && { catSlug: cat }),
    },
  };

  try {
    const [posts, count] = await db.$transaction([
      db.post.findMany(query),
      db.post.count({ where: query.where }),
    ]);

    return new NextResponse(JSON.stringify({ posts, count }), { status: 200 });
  } catch (err: any) {
    // console.log(err);
    return new NextResponse("error in get posts", { status: 500 });
  }
};

type UserData = {
  name?: string | null | undefined;
  email?: string | null | undefined;
  image?: string | null | undefined;
};

type UserDataWithUsername = UserData & {
  username?: string | null | undefined;
  eAddress?: string | null | undefined;
};

// CREATE A POST
export const POST = async (req: Request) => {
  const session = await getAuthSession();

  if (!session) {
    return  NextResponse.json(({ message: "Not Authenticated!" }), { status: 401 });
  }

  const userDataWithUsername: UserDataWithUsername = session?.user ?? {};
  const { email } = userDataWithUsername;

  try {
    const body = await req.json();
    const post = await db.post.create({
      data: { ...body, email },
    });

    return NextResponse.json((post), { status: 200 });
  } catch (err) {
    // console.log(err);
    return NextResponse.json({ message: "Something went wrong!" }, { status: 500 })
  }
};
