"use client";


import {APIResponse} from "@/types";
import {Reservation} from "@/features/reservation/reservation.types";
import {createContext, ReactNode, useContext, useState} from "react";
import {getErrorMsg} from "@/lib/api-util";
import {AxiosResponse} from "axios";
import {axiosInstance} from "@/lib/axios";

interface ManageReservationContextType {
  isLoadingReservations: boolean;
  loadReservationsError: string;
  loadReservations: (businessId: string) => Promise<Reservation[] | null>;
}

const ManageReservationContext = createContext<ManageReservationContextType | null>(null);

export const useManageReservation = () => {
  const ctx = useContext(ManageReservationContext);
  if (!ctx) throw new Error("useManageReservation must be used within ManageReservationProvider.")
  return ctx
}

export function ManageReservationProvider({children}: { children: ReactNode }) {

  const [isLoadingReservations, setIsLoadingReservations] = useState<boolean>(false);
  const [loadReservationsError, setLoadReservationsError] = useState<string>("");

  const loadReservations = async (businessId: string): Promise<Reservation[] | null> => {
    setIsLoadingReservations(true);
    setLoadReservationsError("");
    try {
      const response: AxiosResponse<APIResponse<Reservation[]>> = await axiosInstance.get(`/businesses/manage/${businessId}/reservations`);
      console.log(response.data.data);
      return response.data.data;
    } catch (error) {
      setLoadReservationsError(getErrorMsg(error));
      return null;
    } finally {
      setIsLoadingReservations(false);
    }
  };

  return (
    <ManageReservationContext.Provider value={{
      isLoadingReservations,
      loadReservationsError,
      loadReservations
    }}>
      {children}
    </ManageReservationContext.Provider>
  )
}