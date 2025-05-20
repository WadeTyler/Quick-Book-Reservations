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

  isAddingStaff: boolean;
  addStaffError: string;
  addStaff: (businessId: string, email: string) => Promise<ManagedBusiness | null>;

  isRemovingStaff: boolean;
  removeStaffError: string;
  removeStaff: (businessId: string, userId: string) => Promise<ManagedBusiness | null>;
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

  const [isAddingStaff, setIsAddingStaff] = useState(false);
  const [addStaffError, setAddStaffError] = useState("");

  async function addStaff(businessId: string, email: string): Promise<ManagedBusiness | null> {
    setIsAddingStaff(true);
    setAddStaffError("");
    try {
      const response: AxiosResponse<APIResponse<ManagedBusiness>> = await axiosInstance.post(`/businesses/manage/${businessId}/staff`, {email});
      setManagedBusiness(response.data.data);
      return response.data.data;
    } catch (e) {
      setAddStaffError(getErrorMsg(e));
      return null;
    } finally {
      setIsAddingStaff(false);
    }
  }

  const [isRemovingStaff, setIsRemovingStaff] = useState(false);
  const [removeStaffError, setRemoveStaffError] = useState("");

  async function removeStaff(businessId: string, userId: string): Promise<ManagedBusiness | null> {
    setIsRemovingStaff(true);
    setRemoveStaffError("");

    try {
      const response: AxiosResponse<APIResponse<ManagedBusiness>> = await axiosInstance.delete(`/businesses/manage/${businessId}/staff/${userId}`);
      setManagedBusiness(response.data.data);
      return response.data.data;
    } catch (e) {
      setRemoveStaffError(getErrorMsg(e));
      return null;
    } finally {
      setIsRemovingStaff(false);
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
      loadManagedBusiness,

      isAddingStaff,
      addStaffError,
      addStaff,

      isRemovingStaff,
      removeStaffError,
      removeStaff
    }}>
      {children}
    </ManagedBusinessContext.Provider>
  )
}