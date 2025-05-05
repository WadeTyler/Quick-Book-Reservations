import axiosInstance from "@/lib/axios";
import {APIResponse} from "@/types/api-response.types";
import {AxiosError, AxiosResponse} from "axios";
import {Business, CreateBusinessRequest} from "@/types/business.types";

export async function fetchAllByOwnerOrStaff() {
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

export async function createBusiness(createBusinessRequest: CreateBusinessRequest) {
  return await axiosInstance.post("/businesses/manage/create", createBusinessRequest)
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