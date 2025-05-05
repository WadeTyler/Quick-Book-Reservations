import {User} from "@/types/auth.types";

export interface Business {
  id: string;
  ownerId: string;
  name: string;
  image: string;
  description: string;
  createdAt: string;
  staffIds: string[];
}

export interface ManagedBusiness extends Business{
  owner: User;
  staff: User[];
  upcomingReservationCount: number;
  servicesCount: number;
}

export type CreateBusinessRequest = {
  name: string;
  image?: File | null;
  description: string;
}

export type BusinessService = {
  id: number;
  business_id: string;
  name: string;
  type: string;
  description: string;
  image: string;
  createdAt: string;
}