"use client";
import React, {FormEvent, useState} from 'react';
import Link from "next/link";
import {CreateReservationRequest} from "@/types/reservation.types";
import {useMutation, useQuery} from "@tanstack/react-query";
import {createReservation} from "@/features/reservation/lib/reservation.service";
import {fetchBusinessById} from "@/features/business/lib/business.service";
import {fetchServiceOfferingById} from "@/features/service-offering/lib/service-offering.service";
import {useParams, usePathname, useRouter, useSearchParams} from "next/navigation";

const CreateReservationForm = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const serviceId = searchParams.get("serviceId");
  const {businessId} = useParams();

  const {data: business, isPending: isLoadingBusiness} = useQuery({
    queryKey: ['business'],
    queryFn: () => fetchBusinessById(businessId as string)
  });

  const {data: serviceOffering, isPending: isLoadingServiceOffering} = useQuery({
    queryKey: ['serviceOffering'],
    queryFn: () => fetchServiceOfferingById({
      businessId: businessId as string,
      serviceId: parseInt(serviceId as string)
    })
  })

  const [formData, setFormData] = useState<CreateReservationRequest>({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    date: '',
    time: ''
  });

  const {
    mutate: handleCreateReservation,
    isPending: isCreatingReservation,
    error: createReservationError
  } = useMutation({
    mutationFn: createReservation,
    onSuccess: async () => {
      const params = new URLSearchParams(searchParams);
      params.set('success', 'true');
      router.push(`${pathname}?${params.toString()}`);
    }
  });

  function handleSubmitForm(e: FormEvent) {
    e.preventDefault();
    if (isLoadingBusiness || isLoadingServiceOffering || isCreatingReservation || !business || !serviceOffering) return;

    console.log("Time: " + formData.time);

    handleCreateReservation({
      businessId: businessId as string,
      serviceId: parseInt(serviceId as string),
      createReservationRequest: formData
    });
  }

  if (!business || !serviceOffering) return null;

  return (
    <form
      onSubmit={handleSubmitForm}
      className="max-w-[55rem] w-full h-full bg-background-secondary flex flex-col items-center justify-center shadow-xl z-20 gap-4 section-padding">
      <h1>Create Reservation</h1>
      <p>Create Reservation at <Link href={`/businesses/${business.id}`}
                                     className="link-1">{business.name}</Link> for &#39;{serviceOffering.name}&#39;
      </p>
      <hr className="w-full"/>

      {/* First Name */}
      <fieldset className="input-container">
        <label htmlFor="firstName" className="input-label">First Name*:</label>
        <input id="firstName"
               name="firstName"
               type="text"
               className="input-bar"
               required
               minLength={3}
               maxLength={100}
               placeholder="Enter your first name"
               value={formData.firstName}
               onChange={(e) => setFormData(prev => ({
                 ...prev,
                 firstName: e.target.value
               }))}
        />
      </fieldset>

      {/* Last Name */}
      <fieldset className="input-container">
        <label htmlFor="lastName" className="input-label">Last Name*:</label>
        <input id="lastName"
               name="lastName"
               type="text"
               className="input-bar"
               required
               minLength={3}
               maxLength={100}
               placeholder="Enter your last name"
               value={formData.lastName}
               onChange={(e) => setFormData(prev => ({
                 ...prev,
                 lastName: e.target.value
               }))}
        />
      </fieldset>

      {/* Email */}
      <fieldset className="input-container">
        <label htmlFor="email" className="input-label">Email*:</label>
        <input id="email"
               name="email"
               type="email"
               className="input-bar"
               required
               minLength={3}
               maxLength={255}
               placeholder="Enter your email"
               value={formData.email}
               onChange={(e) => setFormData(prev => ({
                 ...prev,
                 email: e.target.value
               }))}
        />
      </fieldset>

      {/* Phone Number */}
      <fieldset className="input-container">
        <label htmlFor="phoneNumber" className="input-label">Phone Number*:</label>
        <input id="phoneNumber"
               name="phoneNumber"
               type="text"
               className="input-bar"
               required
               maxLength={20}
               placeholder="Enter your phone number"
               value={formData.phoneNumber}
               onChange={(e) => setFormData(prev => ({
                 ...prev,
                 phoneNumber: e.target.value
               }))}
        />
      </fieldset>

      <div className="w-full flex items-center justify-center md:gap-8 gap-4">
        {/* Date */}
        <fieldset className="input-container">
          <label htmlFor="date" className="input-label">Date*:</label>
          <input id="date"
                 name="date"
                 type="date"
                 className="input-bar"
                 required
                 value={formData.date}
                 onChange={(e) => setFormData(prev => ({
                   ...prev,
                   date: e.target.value
                 }))}
          />
        </fieldset>

        {/* Time */}
        <fieldset className="input-container">
          <label htmlFor="time" className="input-label">Time*:</label>
          <input id="time"
                 name="time"
                 type="time"
                 step="1"
                 className="input-bar"
                 required
                 value={formData.time}
                 onChange={(e) => setFormData(prev => ({
                   ...prev,
                   time: e.target.value
                 }))}
          />
        </fieldset>
      </div>

      {createReservationError && (
        <p className="error-msg">{(createReservationError as Error).message}</p>
      )}

      <button type="submit" className="submit-btn">Create Reservation</button>
    </form>
  );
};

export default CreateReservationForm;