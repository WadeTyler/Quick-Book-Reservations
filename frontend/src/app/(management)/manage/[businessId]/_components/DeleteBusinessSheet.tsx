import {Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger} from "@/components/ui/sheet";
import {Button} from "@/components/ui/button";
import {useState} from "react";
import {useManagedBusiness} from "@/features/business/context/ManagedBusinessContext";
import Loader from "@/components/ui/loader";
import {useRouter} from "next/navigation";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";

export default function DeleteBusinessSheet() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [confirmName, setConfirmName] = useState("");
  const {managedBusiness, deleteBusiness, deleteBusinessError, isDeletingBusiness} = useManagedBusiness();

  const isConfirmationValid = confirmName === managedBusiness?.name;

  async function handleDelete() {
    if (!managedBusiness || !isConfirmationValid) return;

    const deleted = await deleteBusiness(managedBusiness.id);

    if (deleted) {
      setOpen(false);
      setConfirmName("");
      router.push('/dashboard');
    }
  }

  return (
    <Sheet open={open} onOpenChange={(newOpen) => {
      setOpen(newOpen);
      if (!newOpen) setConfirmName("");
    }}>
      <SheetTrigger asChild>
        <Button variant="destructive" size="sm">Delete Business</Button>
      </SheetTrigger>

      <SheetContent className="w-full overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Delete Business</SheetTitle>
          <SheetDescription>
            You are about to permanently delete <span className="text-accent font-semibold">{managedBusiness?.name}</span>.
            This will permanently remove all business data including services and reservations.
            This action is irreversible.
          </SheetDescription>
        </SheetHeader>

        <div className="w-full p-4 flex flex-col gap-4">
          <hr className="w-full"/>

          <div className="space-y-2">
            <Label htmlFor="confirmName">Type <span className="text-accent font-semibold">{managedBusiness?.name}</span> to confirm deletion</Label>
            <Input
              id="confirmName"
              value={confirmName}
              onChange={(e) => setConfirmName(e.target.value)}
              placeholder="Enter business name"
            />
          </div>

          {deleteBusinessError && <p className="text-destructive text-center text-balance">{deleteBusinessError}</p>}

          {isDeletingBusiness ? (
            <Loader/>
          ) : (
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={!isConfirmationValid}
            >
              Delete Business
            </Button>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
