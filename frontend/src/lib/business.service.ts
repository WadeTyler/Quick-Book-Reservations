import axiosInstance from "@/lib/axios";
import {AxiosError, AxiosResponse} from "axios";
import {APIResponse} from "@/types/api-response.types";
import {Business} from "@/types/business.types";

export async function fetchBusinessById(businessId: string) {
  return await axiosInstance.get(`/businesses/${businessId}`)
    .then((response: AxiosResponse<APIResponse<Business>>) => {
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