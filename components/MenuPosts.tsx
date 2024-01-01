"use client"

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import moment from "moment";


interface MenuPostsProps {
  withImage: boolean;
}


const MenuPosts = ({withImage}:MenuPostsProps) => {

  const [populatPost, setPopularPost] = useState([])

  useEffect(() => {
    const x = async () => {
      const res = await fetch("/api/popular")
      
      setPopularPost(await res.json())
    }
    x()
  },[])

  
  return (
    <div className= "flex flex-col items-end gap-[30px] mb-[60px] mt-[35px]">

      {
        populatPost && populatPost.map((item:any) => (
          <Link href={`/posts/${item.slug}`} className="flex items-center gap-[20px] w-full flex-col" key={crypto.randomUUID()}>
       
          {withImage && (
            <div className="relative w-[80px] h-[80px] ml-auto">
              <Image src={item.img} alt="" fill className="rounded-lg border-3" />
            </div>
          )}
  
          <div className="w-[300px] flex flex-col gap-[5px] p-2">
            <span className="px-[8px] py-[3px] text-[10px] bg-black text-white inline-block w-[25%] text-center font-bold rounded-md">{item.catSlug}</span>
            <h3 className="text-[18px] font-bold my-2">
              {item.title}
            </h3>
            <div className="w-[300px] flex items-center justify-between gap-[5px] text-sm p-4">
              <span className="">{item.user.username}</span>
              <span className="text-[gray]"> {moment(item.createdAt.toString()).format('MMM Do YY')}</span>
            </div>
          </div>
  
        </Link>
        ))
      }




    </div>
  );
};

export default MenuPosts;