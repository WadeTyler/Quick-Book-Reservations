'use client';
import React, {useState} from 'react';
import {RiBook2Fill, RiUserFill} from "@remixicon/react";
import Link from "next/link";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {fetchUser, logout} from "@/lib/auth.service";
import {User} from "@/types/auth.types";
import {LoadingSpinnerSM} from "@/components/LoadingSpinners";
import {ClickAwayListener} from "@mui/material";


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

  const [isShowingUserMenu, setIsShowingUserMenu] = useState<boolean>(false);

  // Auth User
  const {data: authUser, isPending: isLoadingAuthUser} = useQuery<User | null>({
    queryKey: ['authUser'],
    queryFn: fetchUser
  });

  const {mutate: handleLogout, isPending: isLoggingOut} = useMutation({
    mutationFn: logout,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['authUser']});
    }
  })

  return (
    <div
      className="fixed top-0 left-0 z-50 w-full h-16 flex gap-4 items-center justify-between px-4 lg:px-16 border-b bg-background"
    >

      {/* Left Side */}
      <div className="inline-flex gap-8 items-center">
        <Link href="/" className="inline-flex gap-2 items-center hover:text-accent duration-200">
          <RiBook2Fill className="size-8"/>
          <span className="text-2xl font-semibold tracking-wide">QUICK BOOK</span>
        </Link>

        {navPages.map((page, index) => (
          <Link href={page.href} className="text-xl hover:text-accent duration-200" key={index}>
            {page.name}
          </Link>
        ))}
      </div>

      {(isLoadingAuthUser || isLoggingOut) && (<LoadingSpinnerSM />)}
      {!isLoadingAuthUser && !authUser && (
        <div className="inline-flex gap-8 items-center">
          <Link href="/login" className="hover:text-accent duration-200">Login</Link>
          <Link href="/signup" className="submit-btn2">Signup</Link>
        </div>
      )}

      {!isLoadingAuthUser && authUser && !isLoggingOut && (
        <div className="relative">
          <div
            onClick={() => setIsShowingUserMenu(true)}
            className="w-8 h-8 bg-white rounded-full flex items-center justify-center group hover:bg-background cursor-pointer duration-200">
            <RiUserFill  className="text-accent-dark group-hover:text-accent duration-200"/>
          </div>

          {isShowingUserMenu && (
            <ClickAwayListener onClickAway={() => setIsShowingUserMenu(false)}>
              <div onClick={() => setIsShowingUserMenu(false)} className="absolute right-0 top-full mt-2 w-fit bg-white rounded-md shadow-md flex flex-col text-accent-dark p-2 gap-1 items-center justify-center">
                <Link href="/account" className="w-full text-center hover:bg-accent-dark hover:text-white duration-200 rounded-md px-2 py-1">Account</Link>
                <span onClick={() => handleLogout()} className="w-full text-center hover:bg-accent-dark hover:text-white duration-200 rounded-md px-2 py-1 cursor-pointer">Logout</span>

              </div>
            </ClickAwayListener>
          )}


        </div>

      )}

    </div>
  );
};

export default Navbar;