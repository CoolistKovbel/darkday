import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Github, Instagram, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#222] p-6 p-y-[20px] mt-[50px] flex items-center justify-between">

      <div className="flex flex-col gap-[14px]">
        <div className="flex items-center gap-[10px]">
          <Image src="/ghost-1.png" alt="ghostieve" width={50} height={50} />
          <h1 className="text-[24px]">ghostieve</h1>
        </div>
        <p className="font-semibold">
         The place to be to hear my thoughts spill and dreams die
        </p>
        <div className="mt-[10px] flex gap-[10px]">
          <Github />
          <Instagram />
          <Twitter />
        </div>
      </div>

      <div className="flex justify-end gap-[100px]">
        <div className=" flex flex-col gap-[10px] font-semibold">
          <span className=" font-bold">Links</span>
          <Link href="/">Home</Link>
          <Link href="/">Blog</Link>
          <Link href="/">About</Link>
          <Link href="/">Contact</Link>
        </div>
        <div className=" flex flex-col gap-[10px] font-semibold">
          <span className=" font-bold">Social</span>
          <Link href="/">Instagram</Link>
          <Link href="/">Tiktok</Link>
          <Link href="/">Youtube</Link>
        </div>
      </div>

    </footer>
  );
};

export default Footer;