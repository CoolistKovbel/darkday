"use client";

import React, { useEffect, useState } from "react";
import Pagination from "./Pagination";
import Card from "./Card";

interface CardListProps {
  page: number;
  cat: any;
}

const getData = async (page: any, cat: any) => {
  const res = await fetch(
    `/api/posts?page=${page}&cat=${cat || ""}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed");
  }

  return res.json();
};

function CardList({ page, cat }: CardListProps) {
  const [postsz, setPosts] = useState([]);
  const [counts, setCount] = useState("");

  const POST_PER_PAGE = 2;

  const hasPrev = POST_PER_PAGE * (page - 1) > 0;

  const hasNext = POST_PER_PAGE * (page - 1) + POST_PER_PAGE < Number(counts);

  useEffect(() => {
    const x = async () => {
      const { posts, count } = await getData(page, cat);
      setCount(count);
      setPosts(posts);
    };
    x();
  }, [page, cat]);

  return (
    <div className="w-full">
      <h2 className="text-4xl font-bold p-10">Recent Posts</h2>

      {/* posts */}
      <div className="h-[80%]">

        {postsz?.map((item: any) => (
          <Card item={item} key={crypto.randomUUID()} />
        ))}

      </div>

      <Pagination hasPrev={hasPrev} hasNext={hasNext} page={page} />
    </div>
  );
}

export default CardList;
