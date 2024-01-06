"use client";

import {
  Menu,
  MessageSquare,
  Plus,
  Settings,
  User,
  UserPlus,
  Users,
} from "lucide-react";
import React from "react";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";
import {
  DropdownMenu,

} from "./ui/dropdown-menu";
import Link from "next/link";

function MobileAuth() {
  const status = "notAuthenticate";
  return (
    <div className="block md:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="secondary">
            <Menu />
          </Button>
        </SheetTrigger>
        <SheetContent>
          <DropdownMenu>
            {status === "notAuthenticate" ? (
              <div className="bg-[#222] w-full h-full text-white flex items-center justify-center flex-col">
                <h2 className="text-2xl font-bold text-center p-3">
                  Sign in or create account
                </h2>

                <Link
                  href="/sign-in"
                  className="p-4 bg-[#323] text-white text-center rounded-md"
                >
                  Enter
                </Link>

                <SheetClose asChild>
                  <Button type="submit" className="w-[80%] mt-4">Close</Button>
                </SheetClose>
              </div>
            ) : (
              <div className="w-full">
                <h2>My Account</h2>

                <nav>
                  <Link href="/">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </Link>

                  <Link href="/">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </Link>
                </nav>

                <div>
                  <Link href="/">
                    <Users className="mr-2 h-4 w-4" />
                    <span>Team</span>
                  </Link>

                  <Link href="/">
                    <UserPlus className="mr-2 h-4 w-4" />
                    <span>Invite users</span>
                  </Link>

                  <Link href="/">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    <span>Message</span>
                  </Link>

                  <Link href="/">
                    <Plus className="mr-2 h-4 w-4" />
                    <span>New Team</span>
                  </Link>
                </div>

                <SheetClose asChild>
                  <Button type="submit" className="w-[80%] mt-4">Close</Button>
                </SheetClose>
              </div>
            )}

          </DropdownMenu>
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default MobileAuth;
