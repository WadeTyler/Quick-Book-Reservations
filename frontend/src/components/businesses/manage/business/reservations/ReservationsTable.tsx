"use client";
import React, {useState} from 'react';
import {ManagedBusiness} from "@/types/business.types";
import {useQuery} from "@tanstack/react-query";
import {fetchAllReservations, fetchReservationsPage} from "@/lib/reservation.service";
import LoadingHandler from "@/components/util/LoadingHandler";

type Props = {
  managedBusiness: ManagedBusiness;
}
const ReservationsTable = ({managedBusiness}: Props) => {

  const [pageNumber, setPageNumber] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(50);
  const [sort, setSort] = useState<string>("date");

  // Fetch reservations
  const {data: reservationsPage, isPending: isLoadingReservationsPage, error: loadReservationsPageError} = useQuery({
    queryKey: ['reservationsPage', managedBusiness.id],
    queryFn: () => fetchReservationsPage({
      businessId: managedBusiness.id,
      pageSize,
      pageNumber,
      sort
    })
  });
  console.log(reservationsPage);

  function getServiceName(serviceId: number) {
    return managedBusiness.serviceOfferings.find(s => s.id === serviceId)?.name;
  }

  return (
    <div className="w-full min-h-96 overflow-auto bg-background-secondary rounded-md shadow-md p-4 flex flex-col items-center justify-center gap-4">
      <h1 className="text-center">Reservations</h1>

      <LoadingHandler isLoading={isLoadingReservationsPage} object={reservationsPage} error={loadReservationsPageError}>

        {reservationsPage && (
          <>
          <table className="w-full table-auto">
            <thead>
            <tr className="text-white text-sm">
              <th className="bg-accent border-background-secondary border p-2">Date</th>
              <th className="bg-accent border-background-secondary border p-2">Time</th>
              <th className="bg-accent border-background-secondary border p-2">Service</th>
              <th className="bg-accent border-background-secondary border p-2">First Name</th>
              <th className="bg-accent border-background-secondary border p-2">Last Name</th>
              <th className="bg-accent border-background-secondary border p-2">Email</th>
              <th className="bg-accent border-background-secondary border p-2">Phone #</th>
              <th className="bg-accent border-background-secondary border p-2">Created At</th>
            </tr>
            </thead>

            <tbody>
            {reservationsPage.content.map((reservation) => (
              <tr className="text-sm bg-background border border-background-secondary duration-200 hover:bg-accent/50 cursor-pointer" key={reservation.id}>
                <td className="p-2">{reservation.date}</td>
                <td className="p-2">{reservation.time}</td>
                <td className="p-2">{getServiceName(reservation.serviceOfferingId)}</td>
                <td className="p-2">{reservation.firstName}</td>
                <td className="p-2">{reservation.lastName}</td>
                <td className="p-2">{reservation.email}</td>
                <td className="p-2">{reservation.phoneNumber}</td>
                <td className="p-2">{new Date(reservation.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
            </tbody>
          </table>
          </>
        )}

      </LoadingHandler>

      
    </div>
  );
};

export default ReservationsTable;