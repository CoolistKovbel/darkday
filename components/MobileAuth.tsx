"use client"

import { CreditCard, LogOut, Mail, Menu, MessageSquare, Plus, PlusCircle, Settings, User, UserPlus, Users } from "lucide-react";
import React from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "./ui/sheet";
import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuPortal, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger } from "./ui/dropdown-menu";
import Link from "next/link";


function MobileAuth() {
    const status = "notAuthenticate"
  return (
    <div className="block md:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline">
            <Menu />
          </Button>
        </SheetTrigger>
        <SheetContent>
        <DropdownMenu>
            
        {status === "notAuthenticate" ? (
            <div>
                <h2>Sign in or create account</h2>
                <Link href="/sign-in">Enter</Link>
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


                </div>
            )}
            <SheetClose asChild>
                <Button type="submit">close</Button>
            </SheetClose>
            </DropdownMenu>
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default MobileAuth;
