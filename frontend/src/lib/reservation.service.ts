import axiosInstance from "@/lib/axios";
import {CreateReservationRequest, Reservation} from "@/types/reservation.types";
import {AxiosError, AxiosResponse} from "axios";
import {APIResponse} from "@/types/api-response.types";

export async function createReservation(request: {
  businessId: string;
  serviceId: number;
  createReservationRequest: CreateReservationRequest;
}) {
  await axiosInstance.post(`/businesses/${request.businessId}/services/${request.serviceId}/reservations`, request.createReservationRequest)
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