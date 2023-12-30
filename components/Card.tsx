import Image from "next/image";
import Link from "next/link";
import React from "react";

interface CardProps {
  item: any;
}

function Card({ item }: CardProps) {
  return (
    <div className="mb-[50px] flex items-center gap-[50px] bg-[#111] shadow-lg" key={crypto.randomUUID()}>
      {/* Image container */}
      <div className="w-[300px] h-[300px] relative">

        <Image src={item.img} alt="blog item" fill />

        <div className="absolute bottom-0 right-0">
          <span className="p-4 bg-black text-emerald-500">
            {item.createdAt.substring(0, 10)} -
          </span>
          <span className="font-bold p-4">{item.catSlug}</span>
        </div>

      </div>

      <div className="w-[70%] flex flex-col gap-[30px]">

        <Link href={`/posts/${item.slug}`}>
          <h2 className="text-2xl md:text-4xl font-bold">{item.title}</h2>
        </Link>

        <div
          className="text-sm leading-5 "
          dangerouslySetInnerHTML={{ __html: item.desc.substring(0, 60) }}
        />

        <Link
          href={`/posts/${item.slug}`}
          className="bg-[firebrick] w-[20%] p-2 font-bold text-center self-end"
        >
          Read More
        </Link>
        
      </div>
    </div>
  );
}

export default Card;
