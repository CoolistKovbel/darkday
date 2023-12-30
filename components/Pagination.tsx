"use client";

import React from "react";
import { useRouter } from "next/navigation";

interface PaginationProps{
  page: any;
  hasPrev: any;
  hasNext: any;
}

const Pagination = ({ page, hasPrev, hasNext }: PaginationProps) => {
  const router = useRouter();

  return (
    <div className="flex justify-between">
      <button
        className="w-[100px] p-[16px] bg-[firebrick] cursor-pointer"
        disabled={!hasPrev}
        onClick={() => router.push(`?page=${page - 1}`)}
      >
        Previous
      </button>
      <button
        disabled={!hasNext}
        className="w-[100px] p-[16px] bg-[firebrick] cursor-pointer"
        onClick={() => router.push(`?page=${page + 1}`)}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;