"use client"

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { InitalIze } from "@/lib/web3";
import { Github, Twitter, Instagram } from 'lucide-react';
import Link from "next/link";

import { ModeToggle } from "./ModeToggle";
import { AuthLinks } from "./AuthLinks";
import MobileAuth from "./MobileAuth";

function NavBar() {


  return (
    <div className="flex items-center justify-between gap-2 p-4">
      {/* <button onClick={() => InitalIze()}>click</button> */}

      {/* Soocial */}
      <div className="flex items-center justify-between gap-2 ">

        <HoverCard>
          <HoverCardTrigger><a href="www.github.com/user/?" target='_blank' rel="noopener noreferrer"> <Github className="w-[10px] md:w-[20px] h-[20px] md:h-[20px] hover:text-[yellow]" /> </a></HoverCardTrigger>
          <HoverCardContent>
            Follow up with feature project here on github
          </HoverCardContent>
        </HoverCard>

        <HoverCard>
          <HoverCardTrigger><a href="www.github.com/user/?" target='_blank' rel="noopener noreferrer">  <Twitter className="w-[10px] md:w-[20px] h-[20px] md:h-[20px]  hover:text-[yellow]" /> </a></HoverCardTrigger>
          <HoverCardContent>
           Follow up with my latests tweets.
          </HoverCardContent>
        </HoverCard>

        <HoverCard>
          <HoverCardTrigger><a href="www.github.com/user/?" target='_blank' rel="noopener noreferrer">  <Instagram className="w-[10px] md:w-[20px] h-[20px] md:h-[20px]  hover:text-[yellow]" /> </a></HoverCardTrigger>
          <HoverCardContent>
            Take a look at what i try to offer
          </HoverCardContent>
        </HoverCard>
      </div>

      {/* logo */}
      <h1 className="text-2xl md:text-4xl tracking-wider font-bold "><Link href="/">ghostieve</Link></h1>

      {/* Links */}
      <nav className="flex items-center justify-between gap-4 ">

        {/* <ModeToggle /> */}
        <div className="hidden md:block w-[300px] flex item-center gap-10">
          <Link href="/" className="w-10 p-2 font-bold border-2 hover:bg-orange-800">Home</Link>
          <Link href="/" className="w-10 p-2 font-bold border-2 hover:bg-orange-800">About</Link>
          <Link href="/" className="w-10 p-2 font-bold border-2 hover:bg-orange-800">Blog</Link>
          <Link href="/" className="w-10 p-2 font-bold border-2 hover:bg-orange-800">Defi</Link>
        </div>
        <MobileAuth />
        
        <AuthLinks />
      </nav>
      
      
    </div>
  )
}

export default NavBar