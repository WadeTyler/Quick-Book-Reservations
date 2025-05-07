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

export interface ManagedBusiness extends Business{
  owner: User;
  staff: User[];
  upcomingReservationCount: number;
  servicesCount: number;
  services: Service[];
}

export type Service = {
  id: number;
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

export type CreateServiceRequest = {
  name: string;
  type: string;
  description: string;
  image?: File | null;
}