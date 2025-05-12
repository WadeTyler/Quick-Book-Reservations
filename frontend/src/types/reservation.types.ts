
export type CreateReservationRequest = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  date: string;
  time: string;
}

export type Reservation = {
  id: number;
  serviceOfferingId: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  date: string;
  time: string;
  createAt: string;
}