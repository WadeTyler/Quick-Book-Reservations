"use client";

import {CardHeader, Card, CardContent} from "@/components/ui/card";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {FormEvent, useRef, useState} from "react";
import {Textarea} from "@/components/ui/textarea";
import Image from "next/image";
import {CreateBusinessRequest} from "@/features/business/business.types";
import {useManagedBusiness} from "@/features/business/context/ManagedBusinessContext";
import {useRouter} from "next/navigation";
import Loader from "@/components/ui/loader";
import QuestionTooltip from "@/components/ui/QuestionTooltip";

export default function CreateBusinessForm() {

  const router = useRouter();

  const {createBusiness, createBusinessError, isCreatingBusiness} = useManagedBusiness();

  const imageInputRef = useRef<HTMLInputElement>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  function handleClearImage() {
    if (imageInputRef.current) {
      imageInputRef.current.value = "";
      setImagePreview(null);
    }
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const id = formData.get("id") as string;
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const imageFile = formData.get("image") as File | null;

    if (!id || !name || !description || isCreatingBusiness) return;

    const createRequest: CreateBusinessRequest = {
      id,
      name,
      description,
      image: imageFile && imageFile.size > 0 ? imageFile : null
    }

    const newBusiness = await createBusiness(createRequest);

    if (newBusiness) {
      router.push(`/manage/${newBusiness.id}`);
    }
  }

  return (
    <Card className="max-w-lg w-full">
      <CardHeader>
        <h1 className="font-semibold text-accent text-center text-2xl md:text-3xl">Create Business</h1>
        <p className='text-center text-balance mb-4'>Create your business and manage your reservations!</p>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          <div className="flex-1">
            <Label htmlFor="name" className="mb-2 block">Business Name</Label>
            <Input
              id="name"
              name="name"
              placeholder="Enter your business name"
              required
              minLength={3}
              maxLength={100}
            />
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Label htmlFor="id">Business Abbreviation</Label>
              <QuestionTooltip message="Business abbreviation will be used in the URL for your business. Abbreviation cannot be changed once set."/>
            </div>
            <Input
              id="id"
              name="id"
              placeholder="Enter your business abbreviation"
              required
              minLength={3}
              maxLength={15}
            />
          </div>

          <div className="flex-1">
            <Label htmlFor="id" className="mb-2 block">Business Description</Label>
            <Textarea
              id="description"
              name="description"
              className="resize-none h-36"
              placeholder="Enter your business description"
              required
              minLength={20}
              maxLength={500}
            />
          </div>

          <div className="relative w-full aspect-video">
            <Image src={imagePreview || "/default-image.jpg"} alt="Image Preview" fill={true} objectFit="cover"
                   objectPosition="center" className="rounded-md shadow-md aspect-video"/>
          </div>

          <div className="flex-1">
            <Input
              ref={imageInputRef}
              id="image"
              name="image"
              hidden
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files ? e.target.files[0] : null;
                if (file) {
                  setImagePreview(URL.createObjectURL(file));
                } else {
                  setImagePreview(null);
                }
              }}
            />

            <Button type="button" asChild variant="outline" className="w-full">
              <Label htmlFor="image">
                Add Image
              </Label>
            </Button>

            {imagePreview && (
              <Button type="button" variant={"outline"} className="w-full mt-2" onClick={handleClearImage}>
                Remove Image
              </Button>
            )}
          </div>

          {createBusinessError && <p className="text-destructive text-center text-balance">{createBusinessError}</p>}

          <Button type="submit" className="w-full">
            {isCreatingBusiness ? <Loader/> : "Create Business"}
          </Button>

        </form>
      </CardContent>
    </Card>
  )

}

