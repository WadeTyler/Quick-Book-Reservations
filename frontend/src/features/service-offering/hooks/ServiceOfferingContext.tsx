"use client";

import {createContext, ReactNode, useContext, useState} from "react";
import {ServiceOffering} from "@/features/service-offering/service-offering.types";
import {AxiosResponse} from "axios";
import {APIResponse} from "@/types";
import {axiosInstance} from "@/lib/axios";
import {getErrorMsg} from "@/lib/api-util";

interface ServiceOfferingContextType {
  serviceOfferings: ServiceOffering[] | null;
  isLoadingServiceOfferings: boolean;
  loadServiceOfferingsError: string;
  loadServiceOfferings: (businessId: string) => void;
}

const ServiceOfferingContext = createContext<ServiceOfferingContextType | null>(null);

export const useServiceOffering = () => {
  const ctx = useContext(ServiceOfferingContext);
  if (!ctx) throw new Error("useServiceOffering must be used within ServiceOfferingProvider.")
  return ctx;
}

export function ServiceOfferingProvider({children}: { children: ReactNode }) {

  const [serviceOfferings, setServiceOfferings] = useState<ServiceOffering[] | null>(null);
  const [isLoadingServiceOfferings, setIsLoadingServiceOfferings] = useState(false);
  const [loadServiceOfferingsError, setLoadServiceOfferingsError] = useState("");

  async function loadServiceOfferings(businessId: string) {
    setIsLoadingServiceOfferings(true);
    setLoadServiceOfferingsError("");

    try {
      const response: AxiosResponse<APIResponse<ServiceOffering[]>> = await axiosInstance.get(`/businesses/${businessId}/services`);
      setServiceOfferings(response.data.data);
      return response.data.data;
    } catch (e) {
      setLoadServiceOfferingsError(getErrorMsg(e));
      setServiceOfferings(null);
    } finally {
      setIsLoadingServiceOfferings(false);
    }
  }

  return (
    <ServiceOfferingContext.Provider value={{
      serviceOfferings,
      isLoadingServiceOfferings,
      loadServiceOfferingsError,
      loadServiceOfferings
    }}>
      {children}
    </ServiceOfferingContext.Provider>
  )

}