import axiosInstance from "@/lib/axios";
import {CreateReservationRequest, Reservation} from "@/types/reservation.types";
import {AxiosError, AxiosResponse} from "axios";
import {APIResponse} from "@/types/api-response.types";
import {Page} from "@/types/page.types";

export async function createReservation(request: {
  businessId: string;
  serviceId: number;
  createReservationRequest: CreateReservationRequest;
}) {
  return await axiosInstance.post(`/businesses/${request.businessId}/services/${request.serviceId}/reservations`, request.createReservationRequest)
    .then((response: AxiosResponse<APIResponse<Reservation>>) => {
      // Success!

      if (!response.data.isSuccess) {
        throw new Error(response.data.message);
      }

      return response.data.data;
    })
    .catch((error: AxiosError<APIResponse<null>>) => {
      // Failed!
      throw new Error(error.response?.data.message || "Something went wrong. Try again later.");
    });
}

export async function fetchAllReservations(businessId: string): Promise<Reservation[]> {
  return await axiosInstance.get(`/businesses/manage/${businessId}/reservations`)
    .then((response: AxiosResponse<APIResponse<Reservation[]>>) => {
      // Success!

      if (!response.data.isSuccess) {
        throw new Error(response.data.message);
      }

      return response.data.data;
    })
    .catch((error: AxiosError<APIResponse<null>>) => {
      // Failed!
      throw new Error(error.response?.data.message || "Something went wrong. Try again later.");
    });
}

export async function fetchReservationsPage(request: {
  businessId: string;
  pageNumber: number;
  pageSize: number;
  sort: string;
}) {
  return await axiosInstance.get(`/businesses/manage/${request.businessId}/reservations/page?pageNumber=${request.pageNumber}&pageSize=${request.pageSize}&sort=${request.sort}`)
    .then((response: AxiosResponse<APIResponse<Page<Reservation>>>) => {
      // Success!

      if (!response.data.isSuccess) {
        throw new Error(response.data.message);
      }

      return response.data.data;
    })
    .catch((error: AxiosError<APIResponse<null>>) => {
      // Failed!
      throw new Error(error.response?.data.message || "Something went wrong. Try again later.");
    });
}