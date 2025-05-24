"use client";

import {Sheet, SheetContent, SheetTrigger} from "@/components/ui/sheet";
import {Button} from "@/components/ui/button";
import {Menu} from "lucide-react";
import Link from "next/link";
import AuthOnly from "@/features/auth/components/AuthOnly";
import ModeToggle from "@/components/theme/ModeToggle";
import UserOptions from "@/components/NavBar/UserOptions";
import UnAuthOnly from "@/features/auth/components/UnAuthOnly";
import {useState} from "react";

export default function MobileNav() {

  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <Sheet onOpenChange={setOpen} open={open}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon">
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-[300px] overflow-y-auto">
          <div className="flex flex-col gap-4 mt-8 p-4">

            <Link href={"/about"} className="text-lg" onClick={() => setOpen(false)}>
              About
            </Link>

            <AuthOnly showLoader={false}>
              <Link href={"/dashboard"} className="text-lg" onClick={() => setOpen(false)}>
                Dashboard
              </Link>
              <div className="flex items-center gap-4">
                <ModeToggle />
                <UserOptions />
              </div>
            </AuthOnly>

            <UnAuthOnly showLoader={false}>
              <div className="flex items-center gap-4 mb-4">
                <ModeToggle />
              </div>
              <Link href={"/login"} className="text-lg" onClick={() => setOpen(false)}>
                <Button className="w-full" variant="outline">Login</Button>
              </Link>
              <Link href={"/signup"} onClick={() => setOpen(false)}>
                <Button className="w-full">Signup</Button>
              </Link>
            </UnAuthOnly>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}