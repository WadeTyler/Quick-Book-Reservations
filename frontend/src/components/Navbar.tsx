'use client';
import React from 'react';
import {RiBook2Fill} from "@remixicon/react";
import Link from "next/link";
import {useQuery, useQueryClient} from "@tanstack/react-query";
import {fetchUser} from "@/lib/auth.service";
import {User} from "@/types/auth.types";
import {LoadingSpinnerSM} from "@/components/LoadingSpinners";


type Page = {
  name: string;
  href: string;
}

const navPages: Page[] = [
  {name: 'Home', href: "/"},
  {name: 'Manage Applications', href: "/manage/applications"}
];

const Navbar = () => {

  const queryClient = useQueryClient();

  // Auth User
  const {data: authUser, isPending: isLoadingAuthUser} = useQuery<User | null>({
    queryKey: ['authUser'],
    queryFn: fetchUser
  });

  return (
    <div
      className="fixed top-0 left-0 z-50 w-full h-16 bg-accent-dark text-white flex gap-4 items-center justify-between px-4 lg:px-16"
    >

      {/* Left Side */}
      <div className="inline-flex gap-8 items-center">
        <Link href="/" className="inline-flex gap-2 items-center">
          <RiBook2Fill className="size-8"/>
          <span className="text-2xl font-semibold tracking-wide">QUICK BOOK</span>
        </Link>

        {navPages.map((page, index) => (
          <Link href={page.href} className="text-xl" key={index}>
            {page.name}
          </Link>
        ))}
      </div>

      {isLoadingAuthUser && (<LoadingSpinnerSM />)}
      {!isLoadingAuthUser && !authUser && (
        <div className="inline-flex gap-8 items-center">
          <Link href="/signup">Signup</Link>
          <Link href="/login">Login</Link>
        </div>
      )}

      {!isLoadingAuthUser && authUser && (
        <></>
      )}

    </div>
  );
};

export default Navbar;