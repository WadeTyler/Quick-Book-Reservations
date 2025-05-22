"use client";
import {
  Business,
  CreateBusinessRequest,
  ManagedBusiness,
  UpdateBusinessRequest
} from "@/features/business/business.types";
import {createContext, ReactNode, useContext, useState} from "react";
import {AxiosResponse} from "axios";
import {APIResponse} from "@/types";
import {axiosInstance} from "@/lib/axios";
import {getErrorMsg} from "@/lib/api-util";
import {ManageServiceOfferingRequest} from "@/features/service-offering/service-offering.types";
import {ManagedBusinessContextType} from "@/features/business/context/managed-business-context.types";

const ManagedBusinessContext = createContext<ManagedBusinessContextType | null>(null);

export const useManagedBusiness = () => {
  const ctx = useContext(ManagedBusinessContext);
  if (!ctx) throw new Error("useManagedBusiness must be used within ManagedBusinessProvider.")
  return ctx;
}

export function ManagedBusinessProvider({children}: {children: ReactNode}) {

  const [isCreatingBusiness, setIsCreatingBusiness] = useState(false);
  const [createBusinessError, setCreateBusinessError] = useState("");

  async function createBusiness(createRequest: CreateBusinessRequest): Promise<ManagedBusiness | null> {
    setIsCreatingBusiness(true);
    setCreateBusinessError("");
    try {
      const response: AxiosResponse<APIResponse<ManagedBusiness>> = await axiosInstance.post(
        "/businesses/manage",
        createRequest,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      return response.data.data;
    } catch (e) {
      setCreateBusinessError(getErrorMsg(e));
      return null;
    } finally {
      setIsCreatingBusiness(false);
    }
  }


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

  const [isUpdating, setIsUpdating] = useState(false);
  const [updateError, setUpdateError] = useState("");

  async function update(businessId: string, updateBusinessRequest: UpdateBusinessRequest): Promise<ManagedBusiness | null> {
    setIsUpdating(true);
    setUpdateError("");
    try {
      const response: AxiosResponse<APIResponse<ManagedBusiness>> = await axiosInstance.put(`/businesses/manage/${businessId}`, updateBusinessRequest, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      setManagedBusiness(response.data.data);
      return response.data.data;
    } catch (e) {
      setUpdateError(getErrorMsg(e));
      return null;
    } finally {
      setIsUpdating(false);
    }
  }

  const [isCreatingService, setIsCreatingService] = useState(false);
  const [createServiceError, setCreateServiceError] = useState("");

  async function createService(businessId: string, createRequest: ManageServiceOfferingRequest): Promise<ManagedBusiness | null> {
    setIsCreatingService(true);
    setCreateServiceError("");
    try {
      const response: AxiosResponse<APIResponse<ManagedBusiness>> = await axiosInstance.post(
        `/businesses/manage/${businessId}/services`,
        createRequest,
        { headers: { "Content-Type": "multipart/form-data" }}
      );
      console.log(response.data.data);
      setManagedBusiness(response.data.data);
      return response.data.data;
    } catch (e) {
      setCreateServiceError(getErrorMsg(e));
      return null;
    } finally {
      setIsCreatingService(false);
    }
  }


  const [isUpdatingService, setIsUpdatingService] = useState(false);
  const [updateServiceError, setUpdateServiceError] = useState("");

  async function updateService(businessId: string, serviceId: number, updateRequest: ManageServiceOfferingRequest): Promise<ManagedBusiness | null> {
    setIsUpdatingService(true);
    setUpdateServiceError("");
    try {
      const response: AxiosResponse<APIResponse<ManagedBusiness>> = await axiosInstance.put(
        `/businesses/manage/${businessId}/services/${serviceId}`,
        updateRequest,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      setManagedBusiness(response.data.data);
      return response.data.data;
    } catch (e) {
      setUpdateServiceError(getErrorMsg(e));
      return null;
    } finally {
      setIsUpdatingService(false);
    }
  }


  const [isDeletingService, setIsDeletingService] = useState(false);
  const [deleteServiceError, setDeleteServiceError] = useState("");

  async function deleteService(businessId: string, serviceId: number): Promise<ManagedBusiness | null> {
    setIsDeletingService(true);
    setDeleteServiceError("");
    try {
      const response: AxiosResponse<APIResponse<ManagedBusiness>> = await axiosInstance.delete(
        `/businesses/manage/${businessId}/services/${serviceId}`
      );
      setManagedBusiness(response.data.data);
      return response.data.data;
    } catch (e) {
      setDeleteServiceError(getErrorMsg(e));
      return null;
    } finally {
      setIsDeletingService(false);
    }
  }

  return (
    <ManagedBusinessContext.Provider value={{
      isCreatingBusiness,
      createBusinessError,
      createBusiness,

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
      removeStaff,

      isUpdating,
      updateError,
      update,

      isCreatingService,
      createServiceError,
      createService,

      isUpdatingService,
      updateServiceError,
      updateService,

      isDeletingService,
      deleteServiceError,
      deleteService
    }}>
      {children}
    </ManagedBusinessContext.Provider>
  )
}