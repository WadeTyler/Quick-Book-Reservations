export type ServiceOffering = {
  id: number;
  businessId: string;
  name: string;
  description: string;
  type: string;
  image: string;
  enabled: boolean;
  displayPublic: boolean;
  allowPublic: boolean;
  priceInCents: number;
  createdAt: string;
}

export type ManageServiceOfferingRequest = {
  name: string;
  type: string;
  description: string;
  image?: File | null;
  removeImage?: boolean;
  enabled: boolean;
  displayPublic: boolean;
  allowPublic: boolean;
  priceInCents: number;
}