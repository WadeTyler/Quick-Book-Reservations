"use client";

import {useAuth} from "@/features/auth/context/AuthContext";
import {Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger} from "@/components/ui/sheet";
import {Button} from "@/components/ui/button";
import {FormEvent, useState} from "react";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import Loader from "@/components/ui/loader";

export default function ChangePasswordSheet() {

  const [open, setOpen] = useState(false);

  const {changePassword, changePasswordError, isChangingPassword} = useAuth();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const currentPassword = formData.get("currentPassword") as string;
    const newPassword = formData.get("newPassword") as string;
    const confirmNewPassword = formData.get("confirmNewPassword") as string;

    if (isChangingPassword || !currentPassword || !newPassword || !confirmNewPassword) return;

    const success = await changePassword(currentPassword, newPassword, confirmNewPassword);

    if (success) {
      setOpen(false);
    }
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button>Change Password</Button>
      </SheetTrigger>
      <SheetContent className="w-full">
        <SheetHeader>
          <SheetTitle>Change Password</SheetTitle>
          <SheetDescription>Change your account password.</SheetDescription>
        </SheetHeader>
        <form onSubmit={handleSubmit} className="w-full p-4 flex flex-col gap-4">

          <div className="flex-1">
            <Label htmlFor="currentPassword" className="block mb-2">Current Password</Label>
            <Input
              id="currentPassword"
              name="currentPassword"
              type="password"
              required
              placeholder="Enter your current password"
              />
          </div>

          <div className="flex-1">
            <Label htmlFor="newPassword" className="block mb-2">New Password</Label>
            <Input
              id="newPassword"
              name="newPassword"
              type="password"
              required
              minLength={6}
              maxLength={100}
              placeholder="Enter your new password"
            />
          </div>

          <div className="flex-1">
            <Label htmlFor="confrimNewPassword" className="block mb-2">Confirm New Password</Label>
            <Input
              id="confirmNewPassword"
              name="confirmNewPassword"
              type="password"
              required
              placeholder="Confirm your new password"
            />
          </div>

          {changePasswordError && <p className="text-destructive text-center text-balance">{changePasswordError}</p>}

          <Button className="w-full" type="submit">
            {isChangingPassword ? <Loader /> : "Change Password"}
          </Button>
        </form>
      </SheetContent>
    </Sheet>
  )
}