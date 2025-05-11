import {ManagedBusiness} from "@/types/business.types";
import {AxiosError, AxiosResponse} from "axios";
import {APIResponse} from "@/types/api-response.types";
import axiosInstance from "@/lib/axios";
import {ManageServiceOfferingRequest, ServiceOffering} from "@/types/service-offering.types";

export async function createService(request: {
  businessId: string;
  createServiceRequest: ManageServiceOfferingRequest;
}) {
  return await axiosInstance.post(`/businesses/manage/${request.businessId}/services`, request.createServiceRequest, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  })
    .then((response: AxiosResponse<APIResponse<ManagedBusiness>>) => {
      // Success!

      if (!response.data.isSuccess) {
        throw new Error(response.data.message);
      }
      return response.data.data;
    })
    .catch((error: AxiosError<APIResponse<null>>) => {
      // Failed

      throw new Error(error.response?.data.message || "Something went wrong. Try again later.");
    })
}

export async function deleteService(request: {
  businessId: string;
  serviceId: number;
}) {
  return await axiosInstance.delete(`/businesses/manage/${request.businessId}/services/${request.serviceId}`)
    .then((response: AxiosResponse<APIResponse<ManagedBusiness>>) => {
      // Success!

      if (!response.data.isSuccess) {
        throw new Error(response.data.message);
      }
      return response.data.data;
    })
    .catch((error: AxiosError<APIResponse<null>>) => {
      // Failed

      throw new Error(error.response?.data.message || "Something went wrong. Try again later.");
    })
}

export async function updateService(request: {
  businessId: string;
  serviceId: number;
  manageServiceRequest: ManageServiceOfferingRequest;
}) {
  return await axiosInstance.put(`/businesses/manage/${request.businessId}/services/${request.serviceId}`, request.manageServiceRequest, {
    headers: {
      'Content-Type': "multipart/form-data"
    }
  })
    .then((response: AxiosResponse<APIResponse<ManagedBusiness>>) => {
      // Success!

      if (!response.data.isSuccess) {
        throw new Error(response.data.message);
      }
      return response.data.data;
    })
    .catch((error: AxiosError<APIResponse<null>>) => {
      // Failed

      throw new Error(error.response?.data.message || "Something went wrong. Try again later.");
    })
}

export async function fetchAllServiceOfferings(request: {
  businessId: string;
}) {
  return await axiosInstance.get(`/businesses/${request.businessId}/services`)
    .then((response: AxiosResponse<APIResponse<ServiceOffering[]>>) => {
      // Success!

      if (!response.data.isSuccess) {
        throw new Error(response.data.message);
      }
      return response.data.data;
    })
    .catch((error: AxiosError<APIResponse<null>>) => {
      // Failed

      throw new Error(error.response?.data.message || "Something went wrong. Try again later.");
    })
}