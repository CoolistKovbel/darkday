"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";


const getData = async () => {
  const res = await fetch(`http://localhost:3000/api/category`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed");
  }

  return res.json();
};

interface CategoryList{
  withImage: boolean
}

function CategoryList({withImage}: CategoryList) {
  const [dataz, setDataZ] = useState([]);

  useEffect(() => {
    const x = async () => {
      const dat = await getData();
      setDataZ(dat);
    };

    x();
  }, []);

  return (
    <div className="my-32">
    
      {/* Categories */}
      <div className="flex justify-between text-center gap-10 flex-wrap flex-col md:flex-row">

        {/* Category */}

        {dataz &&
          dataz?.map((item: any) => (
            <Link
              href={`/blog?cat=${item.slug}`}
              key={item._id}
              className="flex items-center relative gap-3 capitalize bg-[#111] w-[40%] md:w-[15%] h-[80px] justify-center drop-shadow-lg shadow-[#50d71e] border-2 border-[#222] rounded-md m-auto"
            >
              {withImage &&  (
                <Image
                  src={item.img}
                  alt="cat"
                  width={70}
                  height={70}
                  className="rounded-full"
                />
              )}

              <p className="font-bold">{item.title}</p>

            </Link>
          ))}

      </div>

    </div>
  );
}

export default CategoryList;
