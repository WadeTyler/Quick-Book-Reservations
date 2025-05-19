"use client";
import {createContext, ReactNode, useContext, useState} from "react";
import {AxiosResponse} from "axios";
import {APIResponse} from "@/types";
import {Business} from "@/features/business/business.types";
import {axiosInstance} from "@/lib/axios";
import {getErrorMsg} from "@/lib/api-util";

interface BusinessContextType {
  currentBusiness: Business | null;
  isLoadingCurrentBusiness: boolean;
  loadCurrentBusinessError: string;
  loadCurrentBusiness: (businessId: string) => void;
}

const BusinessContext = createContext<BusinessContextType | undefined>(undefined)

export const useBusiness = () => {
  const ctx = useContext(BusinessContext);
  if (!ctx) throw new Error("useBusiness must be used within BusinessProvider.")
  return ctx;
}

export function BusinessProvider({children}: {children: ReactNode}) {

  const [currentBusiness, setCurrentBusiness] = useState<Business | null>(null);
  const [isLoadingCurrentBusiness, setIsLoadingCurrentBusiness] = useState(false);
  const [loadCurrentBusinessError, setLoadCurrentBusinessError] = useState("");

  async function loadCurrentBusiness(businessId: string) {
    setIsLoadingCurrentBusiness(true);
    setLoadCurrentBusinessError("");

    try {
      const response: AxiosResponse<APIResponse<Business>> = await axiosInstance.get(`/businesses/${businessId}`);
      setCurrentBusiness(response.data.data);
      return response.data.data;
    } catch (e) {
      setLoadCurrentBusinessError(getErrorMsg(e));
      setCurrentBusiness(null);
      return null;
    } finally {
      setIsLoadingCurrentBusiness(false);
    }
  }

  return (
    <BusinessContext.Provider value={{
      currentBusiness,
      loadCurrentBusiness,
      loadCurrentBusinessError,
      isLoadingCurrentBusiness
    }}>
      {children}
    </BusinessContext.Provider>
  )
}