import axiosInstance from "@/lib/axios";
import {APIResponse} from "@/types/api-response.types";
import {AxiosError, AxiosResponse} from "axios";
import {
  Business,
  CreateBusinessRequest,
  ManagedBusiness,
  StaffManagementDTO,
} from "@/types/business.types";

export async function fetchAllManagedBusinesses() {
  return await axiosInstance.get("/businesses/manage")
    .then((response: AxiosResponse<APIResponse<Business[]>>) => {
      // Success!
      if (!response.data.isSuccess || !response.data.data) {
        throw new Error(response.data.message);
      }

      // Return businesses
      return response.data.data;
    })
    .catch((error) => {
      // Error
      throw new Error(error.response.data.message || "Something went wrong. Try again later.");
    });
}

export async function fetchManagedBusinessById(businessId: string) {
  return await axiosInstance.get(`/businesses/manage/${businessId}`)
    .then((response: AxiosResponse<APIResponse<ManagedBusiness>>) => {
      // Success!

      if (!response.data.isSuccess || !response.data.data) {
        throw new Error(response.data.message);
      }

      // return business
      return response.data.data;
    })
    .catch((error: AxiosError<APIResponse<null>>) => {
      // Failed!
      throw new Error(error.response?.data.message || "Something went wrong. Try again later.");
    })
}

export async function createBusiness(createBusinessRequest: CreateBusinessRequest) {
  return await axiosInstance.post("/businesses/manage/create", createBusinessRequest, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  })
    .then((response: AxiosResponse<APIResponse<Business>>) => {
      // Success

      if (!response.data.isSuccess || !response.data.data) {
        throw new Error(response.data.message);
      }

      return response.data.data;
    })
    .catch((error: AxiosError<APIResponse<Business>>) => {
      // Failed
      throw new Error(error.response?.data.message || "Something went wrong. Try again later.");
    });
}

export async function addStaff(addStaffRequest: {
  businessId: string;
  staffManagementDTO: StaffManagementDTO
}) {
  return await axiosInstance.post(`/businesses/manage/${addStaffRequest.businessId}/staff`, addStaffRequest.staffManagementDTO)
    .then((response: AxiosResponse<APIResponse<ManagedBusiness>>) => {
      // Success!

      if (!response.data.isSuccess || !response.data.data) {
        throw new Error(response.data.message);
      }

      return response.data.data;
    })
    .catch((error: AxiosError<APIResponse<null>>) => {
      // Failed!
      throw new Error(error.response?.data.message || "Something went wrong. Try again later.");
    })
}

export async function removeStaff(removeStaffRequest: {
  businessId: string;
  staffId: string;
}) {
  return await axiosInstance.delete(`/businesses/manage/${removeStaffRequest.businessId}/staff/${removeStaffRequest.staffId}`)
    .then((response: AxiosResponse<APIResponse<ManagedBusiness>>) => {
      // Success!

      if (!response.data.isSuccess || !response.data.data) {
        throw new Error(response.data.message);
      }

      return response.data.data;
    })
    .catch((error: AxiosError<APIResponse<null>>) => {
      // Failed!
      throw new Error(error.response?.data.message || "Something went wrong. Try again later.");
    })
}