"use client";
import {Business, ManagedBusiness} from "@/features/business/business.types";
import {createContext, ReactNode, useContext, useState} from "react";
import {AxiosResponse} from "axios";
import {APIResponse} from "@/types";
import {axiosInstance} from "@/lib/axios";
import {getErrorMsg} from "@/lib/api-util";

type ManagedBusinessContextType = {
  managedBusinesses: Business[] | null;
  isLoadingManagedBusinesses: boolean;
  loadManagedBusinessesError: string;
  loadManagedBusinesses: () => void;

  managedBusiness: ManagedBusiness | null;
  isLoadingManagedBusiness: boolean;
  loadManagedBusinessError: string;
  loadManagedBusiness: (businessId: string) => Promise<ManagedBusiness | null>;
}

const ManagedBusinessContext = createContext<ManagedBusinessContextType | null>(null);

export const useManagedBusiness = () => {
  const ctx = useContext(ManagedBusinessContext);
  if (!ctx) throw new Error("useManagedBusiness must be used within ManagedBusinessProvider.")
  return ctx;
}

export function ManagedBusinessProvider({children}: {children: ReactNode}) {
  const [managedBusinesses, setManagedBusinesses] = useState<Business[] | null>(null);
  const [isLoadingManagedBusinesses, setIsLoadingManagedBusinesses] = useState(false);
  const [loadManagedBusinessesError, setLoadManagedBusinessesError] = useState("");

  async function loadManagedBusinesses() {
    setIsLoadingManagedBusinesses(true);
    setLoadManagedBusinessesError("");

    try {
      const response: AxiosResponse<APIResponse<Business[]>> = await axiosInstance.get("/businesses/manage");
      setManagedBusinesses(response.data.data);
      return response.data.data;
    } catch (e) {
      setLoadManagedBusinessesError(getErrorMsg(e));
      setManagedBusinesses(null);
      return null;
    } finally {
      setIsLoadingManagedBusinesses(false);
    }
  }


  const [managedBusiness, setManagedBusiness] = useState<ManagedBusiness | null>(null);
  const [isLoadingManagedBusiness, setIsLoadingManagedBusiness] = useState<boolean>(false);
  const [loadManagedBusinessError, setLoadManagedBusinessError] = useState<string>("");

  async function loadManagedBusiness(businessId: string): Promise<ManagedBusiness | null> {
    setIsLoadingManagedBusiness(true);
    setLoadManagedBusinessError("");
    try {
      const response: AxiosResponse<APIResponse<ManagedBusiness>> = await axiosInstance.get(`/businesses/manage/${businessId}`);
      setManagedBusiness(response.data.data);
      return response.data.data;
    } catch (error) {
      setLoadManagedBusinessError(getErrorMsg(error));
      return null;
    } finally {
      setIsLoadingManagedBusiness(false);
    }
  }
  
  return (
    <ManagedBusinessContext.Provider value={{
      managedBusinesses,
      isLoadingManagedBusinesses,
      loadManagedBusinessesError,
      loadManagedBusinesses,

      managedBusiness,
      isLoadingManagedBusiness,
      loadManagedBusinessError,
      loadManagedBusiness
    }}>
      {children}
    </ManagedBusinessContext.Provider>
  )
}