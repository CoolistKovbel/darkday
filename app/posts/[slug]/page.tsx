import Comments from "@/components/Comments";
import Menu from "@/components/Menu";
import Image from "next/image";
import React from "react";
import moment from "moment";


const getData = async (slug: any) => {
  const res = await fetch(`http:localhost:3000/api/posts/${slug}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed");
  }

  return res.json();
};

interface SinglePageProps {
  params: any;
}

async function SinglePage({ params }: SinglePageProps) {
  const { slug } = params;


  const data = await getData(slug);


  return (
    <div className="max-w-[1150px] m-auto">

      {/* Infor container */}
      <div className="flex items-center gap-[50px]">

        <div className="w-full">

          <h1 className="text-2xl md:text-5xl font-bold mb-10">{data?.title}</h1>

          {/* user */}
          <div className="flex items-center gap-[20px]">

            {/* user image */}
            {data?.user.image && (
              <div className="w-[50px] h-[50px] relative">
                <Image
                  src={`/${data?.user.image}`}
                  alt="user iamge"
                  fill
                  className="rounded-full"
                />
              </div>
            )}

            {/* user text */}
            <div className="flex flex-col gap-[5px]">
              <span className="text-[20px] font-bold">
                {data?.user.username}
              </span>
              <span className="">{moment(data?.createdAt.toString()).format('MMM Do YY')}</span>
            </div>

          </div>

        </div>

        {data?.img && (
          <div className="relative w-[1200px] h-[350px] shadow-2xl">
            <Image src={data?.img} alt="feature image" fill />
          </div>
        )}

      </div>

      {/* Content */}
      <div className="flex gap-[50px]">

        {/* post */}
        <div className="mt-[60px] w-full">
          <div dangerouslySetInnerHTML={{ __html: data?.desc }} />

          <div className="mt-10">
            <Comments postSlug={slug} />
          </div>

        </div>

        <Menu />
      </div>

    </div>
  );
}

export default SinglePage;
