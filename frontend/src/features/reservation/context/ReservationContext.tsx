import {createContext, ReactNode, useContext, useState} from "react";
import {CreateReservationRequest, Reservation} from "@/features/reservation/reservation.types";
import {AxiosResponse} from "axios";
import {APIResponse} from "@/types";
import {axiosInstance} from "@/lib/axios";
import {getErrorMsg} from "@/lib/api-util";

interface ReservationContextType {
  isCreatingReservation: boolean;
  createReservationError: string;
  createReservation: (businessId: string, serviceOfferingId: string, createReservationRequest: CreateReservationRequest) => Promise<Reservation | null>;
}

const ReservationContext = createContext<ReservationContextType | null>(null);

export const useReservation = () => {
  const ctx = useContext(ReservationContext);
  if (!ctx) throw new Error("useReservation must be used within ReservationProvider.")
  return ctx
}

export function ReservationProvider({children}: {children: ReactNode}) {

  const [isCreatingReservation, setIsCreatingReservation] = useState(false);
  const [createReservationError, setCreateReservationError] = useState("");

  async function createReservation(businessId: string, serviceOfferingId: string, createReservationRequest: CreateReservationRequest) {
    setIsCreatingReservation(true);
    setCreateReservationError("");
    
    try {
      const response: AxiosResponse<APIResponse<Reservation>> = await axiosInstance.post(`/businesses/${businessId}/services/${serviceOfferingId}/reservations`, createReservationRequest);

      return response.data.data;
    } catch (e) {
      setCreateReservationError(getErrorMsg(e));
      return null;
    } finally {
      setIsCreatingReservation(false);
    }
  }

  return (
    <ReservationContext.Provider value={{
      isCreatingReservation,
      createReservationError,
      createReservation
    }}>
      {children}
    </ReservationContext.Provider>
  )
}
