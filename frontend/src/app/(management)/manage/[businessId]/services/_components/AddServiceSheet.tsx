import {Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger} from "@/components/ui/sheet";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import Loader from "@/components/ui/loader";
import {FormEvent, useState} from "react";
import {useManagedBusiness} from "@/features/business/context/ManagedBusinessContext";
import {ManageServiceOfferingRequest} from "@/features/service-offering/service-offering.types";
import Image from "next/image";

export default function AddServiceSheet() {

  const {managedBusiness, createService, createServiceError, isCreatingService} = useManagedBusiness();

  const [open, setOpen] = useState(false);
  const [createRequest, setCreateRequest] = useState<ManageServiceOfferingRequest>({
    name: "",
    type: "",
    description: "",
    image: null,
    removeImage: false,
    enabled: true,
    displayPublic: true,
    allowPublic: true,
    priceInCents: 0,
    durationInMinutes: 0
  });
  const [imagePreview, setImagePreview] = useState<string>("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (isCreatingService || !managedBusiness || !createRequest.name || !createRequest.type || !createRequest.description) return;

    const updatedManagedBusiness = await createService(managedBusiness.id, createRequest);

    if (updatedManagedBusiness) {
      setOpen(false);
      resetRequest();
    }
  }

  function resetRequest() {
    setCreateRequest({
      name: "",
      type: "",
      description: "",
      image: null,
      removeImage: false,
      enabled: true,
      displayPublic: true,
      allowPublic: true,
      priceInCents: 0,
      durationInMinutes: 0
    });
    setImagePreview("");
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button onClick={resetRequest}>Add Service</Button>
      </SheetTrigger>
      <SheetContent className="w-full overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Add a Service</SheetTitle>
          <SheetDescription>
            Create a brand new service for your business.
          </SheetDescription>
        </SheetHeader>

        <form className="flex flex-col gap-4 container" onSubmit={handleSubmit}>
          <div className="flex-1">
            <Label htmlFor="name" className="mb-2 block">Service Name</Label>
            <Input
              id="name"
              maxLength={100}
              minLength={3}
              required
              placeholder="Enter a name for your service"
              value={createRequest.name}
              onChange={e => setCreateRequest(prev => ({...prev, name: e.target.value}))}
            />
          </div>

          <div className="flex-1">
            <Label htmlFor="type" className="mb-2 block">Service Type</Label>
            <Input
              id="type"
              minLength={3}
              maxLength={100}
              required
              placeholder="Enter a type for your service"
              value={createRequest.type}
              onChange={e => setCreateRequest(prev => ({...prev, type: e.target.value}))}
            />
          </div>

          <div className="flex-1">
            <Label htmlFor="descripition" className="mb-2 block">Service Description</Label>
            <Input
              id="description"
              maxLength={500}
              minLength={20}
              required
              placeholder="Enter a description for your service"
              value={createRequest.description}
              onChange={e => setCreateRequest(prev => ({...prev, description: e.target.value}))}
            />
          </div>

          <div className="flex-1">
            <Label htmlFor="priceInCents" className="mb-2 block">Service Price (USD)</Label>
            <Input
              id="priceInCents"
              type="number"
              step="0.01"
              min={0}
              max={1000000}
              required
              placeholder="Enter a price for your service"
              value={createRequest.priceInCents / 100}
              onChange={e => setCreateRequest(prev => ({...prev, priceInCents: e.target.valueAsNumber * 100}))}
            />
          </div>

          <div className="flex-1">
            <Label htmlFor="durationInMinutes" className="mb-2 block">Service Duration in Minutes</Label>
            <Input
              id="durationInMinutes"
              type="number"
              min={0}
              max={1440}
              required
              placeholder="Enter a duration for your service"
              value={createRequest.durationInMinutes}
              onChange={e => setCreateRequest(prev => ({...prev, durationInMinutes: e.target.valueAsNumber}))}
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
                  setCreateRequest(prev => ({
                    ...prev,
                    image: file,
                    removeImage: false
                  }));
                  setImagePreview(URL.createObjectURL(file));
                } else {
                  setCreateRequest(prev => ({...prev, image: null, removeImage: false}));
                  setImagePreview("");
                }
              }}
            />

            {createRequest.image && (
              <Button type="button" variant="outline" onClick={() => {
                setCreateRequest(prev => ({...prev, image: null, removeImage: false}));
                setImagePreview("");
              }}>
                Reset Image
              </Button>
            )}
          </div>

          <hr className="w-full"/>

          {createServiceError && (
            <p className="text-destructive text-sm text-center text-balance">
              {createServiceError}
            </p>
          )}

          <Button variant="accent" size="lg">
            {isCreatingService ? <Loader/> : "Add Service"}
          </Button>

        </form>
      </SheetContent>
    </Sheet>
  )

}

