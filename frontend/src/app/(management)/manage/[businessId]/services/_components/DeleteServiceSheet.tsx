import {ServiceOffering} from "@/features/service-offering/service-offering.types";
import {Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger} from "@/components/ui/sheet";
import {Button} from "@/components/ui/button";
import {useState} from "react";
import {useManagedBusiness} from "@/features/business/context/ManagedBusinessContext";
import Loader from "@/components/ui/loader";

export default function DeleteServiceSheet({targetService}: { targetService: ServiceOffering }) {

  const [open, setOpen] = useState(false);
  const {managedBusiness, deleteService, deleteServiceError, isDeletingService} = useManagedBusiness();

  async function handleDelete() {
    if (!managedBusiness || !targetService) return;

    const updatedManagedBusiness = await deleteService(managedBusiness.id, targetService.id);

    if (updatedManagedBusiness) setOpen(false);
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button size="sm" variant="destructive">Delete</Button>
      </SheetTrigger>

      <SheetContent className="w-full overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Delete Service</SheetTitle>
          <SheetDescription>
            You are about to permanently delete <span className="text-accent font-semibold">{targetService.name}</span>. This will permanently remove all
            data related including reservations. This action is irreversible. Are you sure you want to do this?
          </SheetDescription>
        </SheetHeader>

        <div className="w-full p-4 flex flex-col gap-4">
          <hr className="w-full"/>

          {deleteServiceError && <p className="text-destructive text-center text-balance">{deleteServiceError}</p>}

          {isDeletingService ? (
            <Loader/>
          ) : (
            <Button variant="destructive" onClick={handleDelete}>Delete</Button>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}

