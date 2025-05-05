import {User} from "@/types/auth.types";

export type Business = {
  id: string;
  ownerId: string;
  name: string;
  image?: string;
  description: string;
  createdAt: string;
  staff: User[];
}

export type CreateBusinessRequest = {
  name: string;
  image?: File | null;
  description: string;
}