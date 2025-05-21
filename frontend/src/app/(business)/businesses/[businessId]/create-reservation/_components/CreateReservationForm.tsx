"use client";
import React, {FormEvent, useState} from 'react';
import {Business} from "@/features/business/business.types";
import {ServiceOffering} from "@/features/service-offering/service-offering.types";
import {Card, CardContent, CardHeader} from "@/components/ui/card";
import {Label} from "@/components/ui/label";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Calendar} from "@/components/ui/calendar";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {useReservation} from "@/features/reservation/context/ReservationContext";
import Loader from "@/components/ui/loader";
import {CreateReservationRequest} from "@/features/reservation/reservation.types";
import {useRouter} from "next/navigation";

function CreateReservationForm({currentBusiness, serviceOfferings}: {
  currentBusiness: Business;
  serviceOfferings: ServiceOffering[];
}) {

  const router = useRouter();

  const [selectedService, setSelectedService] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [customerFirstName, setCustomerFirstName] = useState<string>("");
  const [customerLastName, setCustomerLastName] = useState<string>("");
  const [customerEmail, setCustomerEmail] = useState<string>("");
  const [customerPhone, setCustomerPhone] = useState<string>("");

  const timeOptions = [
    "09:00:00",
    "10:00:00",
    "11:00:00",
    "12:00:00"
  ];

  const {createReservation, isCreatingReservation, createReservationError} = useReservation();

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (isCreatingReservation || !selectedService || !customerFirstName || !customerLastName || !selectedDate || !selectedTime || !customerEmail || !customerPhone) return;

    console.log(selectedDate.toISOString().split("T")[0]);
    console.log(selectedTime);

    const createReservationRequest: CreateReservationRequest = {
      firstName: customerFirstName,
      lastName: customerLastName,
      email: customerEmail,
      phoneNumber: customerPhone,
      date: selectedDate.toISOString().split("T")[0],
      time: selectedTime
    };

    const reservation = await createReservation(currentBusiness.id, selectedService, createReservationRequest);

    if (reservation)  {
      router.push(`/businesses/${currentBusiness.id}/reservation-success`);
    }

  }

  return (
    <Card className="w-full max-w-xl p-8 shadow-2xl rounded-3xl bg-background border-0">
      <CardHeader>
        <h1 className="text-xl md:text-3xl text-accent font-semibold tracking-tight">Create Reservation</h1>
        <h2 className="tracking-tight font-semibold md:text-lg">
          {currentBusiness.name}
        </h2>

      </CardHeader>

      {/* Reservation Form */}
      <CardContent>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {/* Service Selection */}
          <div>
            <Label htmlFor="service" className="mb-2 block">Service</Label>
            <Select value={selectedService} onValueChange={setSelectedService} required>
              <SelectTrigger id="service" className="w-full">
                <SelectValue placeholder="Choose a service..."/>
              </SelectTrigger>
              <SelectContent>
                {serviceOfferings.map(service => (
                  <SelectItem key={service.id} value={service.id.toString()}>
                    {service.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Date and Time Selection */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Label className="mb-2 block">Date</Label>
              <Calendar
                required
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-lg border"
              />
            </div>
            <div className="flex-1">
              <Label htmlFor="time" className="mb-2 block">Time</Label>
              <Select value={selectedTime} onValueChange={setSelectedTime} required>
                <SelectTrigger id="time" className="w-full">
                  <SelectValue placeholder="Select time..."/>
                </SelectTrigger>
                <SelectContent>
                  {timeOptions.map(time => (
                    <SelectItem key={time} value={time}>{time}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Customer Info */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Label htmlFor="name" className="mb-2 block">Your First Name</Label>
              <Input
                id="firstName"
                placeholder="Enter your first name"
                required
                value={customerFirstName}
                onChange={e => setCustomerFirstName(e.target.value)}
                autoComplete="first name"
                maxLength={50}
              />
            </div>
            <div className="flex-1">
              <Label htmlFor="lastName" className="mb-2 block">Your Last Name</Label>
              <Input
                id="lastName"
                required
                placeholder="Enter your last name"
                value={customerLastName}
                onChange={e => setCustomerLastName(e.target.value)}
                autoComplete="last name"
                maxLength={50}
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4">

            <div className="flex-1">
              <Label htmlFor="email" className="mb-2 block">Your Email</Label>
              <Input
                id="email"
                type="email"
                required
                placeholder="Enter your email"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                autoComplete="email"
                maxLength={255}
              />
            </div>

            <div className="flex-1">
              <Label htmlFor="phone" className="mb-2 block">Your Phone Number</Label>
              <Input
                id="phone"
                placeholder="Enter your phone number"
                required
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                autoComplete="phone number"
                maxLength={20}
              />
            </div>
          </div>

          {createReservationError && (
            <p className="text-danger text-sm text-center">
              {createReservationError}
            </p>
          )}

          {/* Submit Button */}
          <Button type="submit" size="lg" className="mt-4 w-full text-lg font-semibold">
            {isCreatingReservation ? <Loader /> : 'Book Reservation'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

export default CreateReservationForm;