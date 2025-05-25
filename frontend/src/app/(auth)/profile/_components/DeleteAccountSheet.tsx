"use client";


import {FormEvent, useState} from "react";
import {useAuth} from "@/features/auth/context/AuthContext";
import {Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger} from "@/components/ui/sheet";
import {Button} from "@/components/ui/button";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import Loader from "@/components/ui/loader";
import {useRouter} from "next/navigation";

export default function DeleteAccountSheet() {

  const router = useRouter();
  const [open, setOpen] = useState(false);

  const {deleteAccount, deleteError, isDeleting} = useAuth();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const password = formData.get("password") as string;

    if (isDeleting || !password) return;

    const success = await deleteAccount(password);

    if (success) {
      setOpen(false);
      router.push("/");
    }
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="destructive">Delete Account</Button>
      </SheetTrigger>
      <SheetContent className="w-full overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Delete Account</SheetTitle>
          <SheetDescription>Delete your account and all related data. This action is irreversible and you will lose access to all businesses, services, and reservations managed by this account. Are you sure you want to do this?</SheetDescription>
        </SheetHeader>
        <form onSubmit={handleSubmit} className="w-full p-4 flex flex-col gap-4">

          <div className="flex-1">
            <Label htmlFor="password" className="block mb-2">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              required
              placeholder="Enter your password to continue..."
            />
          </div>

          {deleteError && <p className="text-destructive text-center text-balance">{deleteError}</p>}

          <Button className="w-full" type="submit" variant="destructive">
            {isDeleting ? <Loader /> : "Delete Account"}
          </Button>
        </form>
      </SheetContent>
    </Sheet>
  )
}
