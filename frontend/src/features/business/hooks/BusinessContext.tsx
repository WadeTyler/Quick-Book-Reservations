"use client";
import {createContext, ReactNode, useContext, useState} from "react";
import {AxiosResponse} from "axios";
import {APIResponse} from "@/types";
import {Business, ManagedBusiness} from "@/features/business/business.types";
import {axiosInstance} from "@/lib/axios";
import {getErrorMsg} from "@/lib/api-util";

interface BusinessContextType {
  managedBusinesses: ManagedBusiness[] | null;
  isLoadingManagedBusinesses: boolean;
  loadManagedBusinessesError: string;
  loadManagedBusinesses: () => void;
};

const BusinessContext = createContext<BusinessContextType | undefined>(undefined)

export const useBusiness = () => {
  const ctx = useContext(BusinessContext);
  if (!ctx) throw new Error("useBusiness must be used within BusinessProvider.")
  return ctx;
}

export function BusinessProvider({children}: {children: ReactNode}) {

  const [managedBusinesses, setManagedBusinesses] = useState<Business[] | null>(null);
  const [isLoadingManagedBusinesses, setIsLoadingManagedBusinesses] = useState(false);
  const [loadManagedBusinessesError, setLoadManagedBusinessError] = useState("");

  async function loadManagedBusinesses() {
    setIsLoadingManagedBusinesses(true);
    setLoadManagedBusinessError("");

    try {
      const response: AxiosResponse<APIResponse<Business[]>> = await axiosInstance.get("/businesses/manage");
      setManagedBusinesses(response.data.data);
      return response.data.data;
    } catch (e) {
      setLoadManagedBusinessError(getErrorMsg(e));
      setManagedBusinesses(null);
      return null;
    } finally {
      setIsLoadingManagedBusinesses(false);
    }
  }

  return (
    <BusinessContext.Provider value={{
      managedBusinesses,
      isLoadingManagedBusinesses,
      loadManagedBusinessesError,
      loadManagedBusinesses
    }}>
      {children}
    </BusinessContext.Provider>
  )
}