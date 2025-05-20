"use client";
import {Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger} from "@/components/ui/sheet";
import {Button} from "@/components/ui/button";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {useManagedBusiness} from "@/features/business/hooks/ManagedBusinessContext";
import Loader from "@/components/ui/loader";
import {FormEvent, useState} from "react";

export default function AddStaffSheet() {

  const {managedBusiness, isAddingStaff, addStaffError, addStaff} = useManagedBusiness();

  const [open, setOpen] = useState(false);

  const [email, setEmail] = useState<string>("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (!email || isAddingStaff || !managedBusiness) return;

    const updatedManagedBusiness = await addStaff(managedBusiness.id, email);

    if (updatedManagedBusiness) {
      setEmail("");
      setOpen(false);
    }
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button>Add Staff</Button>
      </SheetTrigger>
      <SheetContent className="w-full">
        <SheetHeader>
          <SheetTitle>Add Staff Members</SheetTitle>
          <SheetDescription>
            Add staff members to your business. To add staff members, enter their email in the form below. The user must
            have have a Quick Book Account.
          </SheetDescription>
        </SheetHeader>

        <form className="flex flex-col gap-4 container" onSubmit={handleSubmit}>
          <div className="flex-1">
            <Label htmlFor="email">User&#39;s Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              placeholder="Enter the user's email"
              maxLength={255}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {addStaffError && (
            <p className="text-destructive text-sm text-center text-balance">
              {addStaffError}
            </p>
          )}

          <Button>
            {isAddingStaff ? <Loader/> : "Add Staff Member"}
          </Button>

        </form>

      </SheetContent>
    </Sheet>
  )
}