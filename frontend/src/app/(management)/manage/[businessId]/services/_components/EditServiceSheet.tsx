import {useManagedBusiness} from "@/features/business/hooks/ManagedBusinessContext";
import {FormEvent, useState} from "react";
import {ManageServiceOfferingRequest, ServiceOffering} from "@/features/service-offering/service-offering.types";
import {Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger} from "@/components/ui/sheet";
import {Button} from "@/components/ui/button";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import Image from "next/image";
import Loader from "@/components/ui/loader";

export default function EditServiceSheet({targetService}: {targetService: ServiceOffering}) {

  const {managedBusiness, updateService, isUpdatingService, updateServiceError} = useManagedBusiness();

  const [open, setOpen] = useState(false);
  const [updateRequest, setUpdateRequest] = useState<ManageServiceOfferingRequest>({
    name: targetService.name,
    type: targetService.type,
    description: targetService.description,
    image: null,
    removeImage: false
  });
  const [imagePreview, setImagePreview] = useState<string>(targetService.image);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (isUpdatingService || !managedBusiness || !updateRequest.name || !updateRequest.type || !updateRequest.description) return;

    const updatedManagedBusiness = await updateService(managedBusiness.id, targetService.id, updateRequest);

    if (updatedManagedBusiness) {
      setOpen(false);
      resetRequest();
    }
  }

  function resetRequest() {
    setUpdateRequest({
      name: targetService.name,
      type: targetService.type,
      description: targetService.description,
      image: null,
      removeImage: false
    });
    setImagePreview(targetService.image);
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm">Edit</Button>
      </SheetTrigger>
      <SheetContent className="w-full">
        <SheetHeader>
          <SheetTitle>Edit a Service</SheetTitle>
          <SheetDescription>
            Edit your existing service.
          </SheetDescription>
        </SheetHeader>

        <form className="flex flex-col gap-4 container" onSubmit={handleSubmit}>
          <div className="flex-1">
            <Label htmlFor="name">Service Name</Label>
            <Input
              id="name"
              maxLength={100}
              minLength={3}
              required
              placeholder="Enter a name for your service"
              value={updateRequest.name}
              onChange={e => setUpdateRequest(prev => ({...prev, name: e.target.value}))}
            />
          </div>

          <div className="flex-1">
            <Label htmlFor="type">Service Type</Label>
            <Input
              id="type"
              minLength={3}
              maxLength={100}
              required
              placeholder="Enter a type for your service"
              value={updateRequest.type}
              onChange={e => setUpdateRequest(prev => ({...prev, type: e.target.value}))}
            />
          </div>

          <div className="flex-1">
            <Label htmlFor="descripition">Service Description</Label>
            <Input
              id="description"
              maxLength={500}
              minLength={20}
              required
              placeholder="Enter a description for your service"
              value={updateRequest.description}
              onChange={e => setUpdateRequest(prev => ({...prev, description: e.target.value}))}
            />
          </div>

          {/* Image */}
          <div className="flex-1 gap-4 flex flex-col">

            <div className="w-full rounded-md relative h-48">
              <Image src={imagePreview || '/default-image.jpg'} alt="Business Image" fill={true} objectFit="cover"
                     objectPosition="center"
                     className="rounded-md shadow-md aspect-video"/>
            </div>

            <Button asChild>
              <Label htmlFor="image">Change Image</Label>
            </Button>

            <Input
              id="image"
              type="file"
              accept="image/*"
              hidden
              onChange={(e) => {
                const file = e.target.files ? e.target.files[0] : null;
                if (file) {
                  setUpdateRequest(prev => ({
                    ...prev,
                    image: file,
                    removeImage: false
                  }));
                  setImagePreview(URL.createObjectURL(file));
                } else {
                  setUpdateRequest(prev => ({...prev, image: null, removeImage: false}));
                  setImagePreview(targetService.image);
                }
              }}
            />

            {targetService.image && !updateRequest.removeImage && (
              <Button type="button" variant="outline" onClick={() => {
                setUpdateRequest(prev => ({
                  ...prev,
                  image: null,
                  removeImage: true
                }));
                setImagePreview('');
              }}>
                Remove Image
              </Button>
            )}

            {updateRequest.image && (
              <Button type="button" variant="outline" onClick={() => {
                setUpdateRequest(prev => ({...prev, image: null, removeImage: false}));
                setImagePreview(targetService.image);
              }}>
                Reset Image
              </Button>
            )}
          </div>

          <hr className="w-full"/>

          {updateServiceError && (
            <p className="text-destructive text-sm text-center text-balance">
              {updateServiceError}
            </p>
          )}

          <Button variant="accent" size="lg">
            {isUpdatingService ? <Loader/> : "Save Changes"}
          </Button>

        </form>
      </SheetContent>
    </Sheet>
  )
}