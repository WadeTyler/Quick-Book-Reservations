import {ManagedBusiness} from "@/types/business.types";
import {ParamValue} from "next/dist/server/request/params";

export const findServiceInBusiness = (managedBusiness: ManagedBusiness | null | undefined, serviceId: ParamValue | string) => {
  if (!managedBusiness) {
    throw new Error("Managed business not found.");
  }

  const service = managedBusiness.services.find(s => s.id === parseInt(serviceId as string));

  if (!service) throw new Error("Service not found.");
  return service;
}