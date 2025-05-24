"use client";
import {Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger} from "@/components/ui/sheet";
import {Button} from "@/components/ui/button";
import {FormEvent, useState} from "react";
import {ManagedBusiness, UpdateBusinessRequest} from "@/features/business/business.types";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import Image from "next/image";
import {useManagedBusiness} from "@/features/business/context/ManagedBusinessContext";
import Loader from "@/components/ui/loader";

export default function EditBusinessSheet({managedBusiness}: { managedBusiness: ManagedBusiness }) {

  const {update, isUpdating, updateError} = useManagedBusiness();

  const [open, setOpen] = useState(false);

  const [updateRequest, setUpdateRequest] = useState<UpdateBusinessRequest>({
    name: managedBusiness.name,
    description: managedBusiness.description,
    image: null,
    removeImage: false
  });

  const [imagePreview, setImagePreview] = useState<string>(managedBusiness.image);

  function resetImage() {
    setUpdateRequest(prev => ({
      ...prev,
      image: null,
      removeImage: false
    }));
    setImagePreview(managedBusiness.image);
  }

  function resetFields() {
    setUpdateRequest({
      name: managedBusiness.name,
      description: managedBusiness.description,
      image: null,
      removeImage: false
    });
    setImagePreview(managedBusiness.image);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (isUpdating || !managedBusiness || !updateRequest.name || !updateRequest.description) return;

    const updatedManagedBusiness = await update(managedBusiness.id, updateRequest);
    if (updatedManagedBusiness) {
      setOpen(false);
    }
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button size="sm" variant="outline" onClick={resetFields}>Edit Business</Button>
      </SheetTrigger>

      <SheetContent className="w-full overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Edit Business</SheetTitle>
          <SheetDescription>
            Please allow up to 5 minutes for changes to be displayed.
          </SheetDescription>
        </SheetHeader>

        <form className="flex flex-col gap-4 container" onSubmit={handleSubmit}>
          <div className="flex-1">
            <Label htmlFor="name" className="block mb-2">Business Name</Label>
            <Input
              id="name"
              required
              minLength={3}
              maxLength={100}
              placeholder="Enter your business name"
              value={updateRequest.name}
              onChange={(e) => setUpdateRequest(prev => ({
                ...prev,
                name: e.target.value
              }))}
            />
          </div>

          <div className="flex-1">
            <Label htmlFor="description" className="block mb-2">Business Description</Label>
            <Textarea
              id="description"
              className="resize-none"
              required
              minLength={20}
              maxLength={500}
              placeholder="Enter your business description"
              value={updateRequest.description}
              onChange={(e) => setUpdateRequest(prev => ({
                ...prev,
                description: e.target.value
              }))}
            />
          </div>

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
                  resetImage()
                }
              }}
            />

            {managedBusiness.image && !updateRequest.removeImage && (
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

            {(updateRequest.image || updateRequest.removeImage) && (
              <Button type="button" variant="outline" onClick={resetImage}>Reset Image</Button>
            )}
          </div>

          <hr className="w-full"/>

          {updateError && (
            <p className="text-destructive text-sm text-center text-balance">
              {updateError}
            </p>
          )}
          <Button type="submit" size="lg" variant="accent">
            {isUpdating ? <Loader /> : "Save Changes"}
          </Button>
        </form>

      </SheetContent>
    </Sheet>
  )
}

