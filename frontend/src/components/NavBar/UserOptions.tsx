"use client";
import {useAuth} from "@/features/auth/context/AuthContext";
import {Avatar, AvatarFallback} from "@/components/ui/avatar";
import {UserIcon} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import Loader from "@/components/ui/loader";

export default function UserOptions() {

  const {authUser, logout, isLoggingOut} = useAuth();
  if (!authUser) return null;

  const fallbackTxt = authUser.firstName.charAt(0) + authUser.lastName.charAt(0);

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar>
            <AvatarFallback>{fallbackTxt || <UserIcon/>}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Account</DropdownMenuLabel>
          <DropdownMenuSeparator/>
          <Link href={"/profile"}>
            <DropdownMenuItem>
              Profile
            </DropdownMenuItem>
          </Link>
          <DropdownMenuItem disabled={isLoggingOut} onClick={logout}>
            {!isLoggingOut ? 'Logout' : <Loader/>}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}