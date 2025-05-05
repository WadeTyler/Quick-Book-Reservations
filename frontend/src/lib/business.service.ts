import axiosInstance from "@/lib/axios";
import {APIResponse} from "@/types/api-response.types";
import {AxiosResponse} from "axios";
import {Business} from "@/types/business.types";

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