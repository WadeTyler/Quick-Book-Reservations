import {User} from "@/types/auth.types";

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

export type ServiceOffering = {
  id: number;
  businessId: string;
  name: string;
  description: string;
  type: string;
  image: string;
  createdAt: string;
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

export type StaffManagementDTO = {
  email: string;
}

export type UpdateBusinessDetailsRequest = {
  name: string;
  description: string;
}

export type UpdateBusinessImageRequest = {
  image: File;
}

export type ManageServiceOferringRequest = {
  name: string;
  type: string;
  description: string;
  image?: File | null;
  removeImage?: boolean;
}