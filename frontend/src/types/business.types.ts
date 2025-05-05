import {User} from "@/types/auth.types";

export type Business = {
  id: string;
  ownerId: string;
  name: string;
  image?: string;
  createdAt: string;
  staff: User[];
}