import {User} from "@/features/auth/auth.types";
import {ServiceOffering} from "@/features/service-offering/service-offering.types";

export interface Business {
  id: string;
  ownerId: string;
  name: string;
  image: string;
  description: string;
  createdAt: string;
  staffIds: string[];
  serviceIds: number[];
}

export interface ManagedBusiness {
  id: string;
  name: string;
  image: string;
  description: string;
  createdAt: string;
  owner: User;
  staff: User[];
  upcomingReservationCount: number;
  serviceOfferings: ServiceOffering[];
}

export type CreateBusinessRequest = {
  name: string;
  image?: File | null;
  description: string;
}

export type StaffManagementDTO = {
  email: string;
}

export type UpdateBusinessRequest = {
  name: string;
  description: string;
  image: File | null;
  removeImage?: boolean;
}

export type UpdateBusinessImageRequest = {
  image: File;
}