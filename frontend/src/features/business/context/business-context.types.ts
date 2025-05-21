import {Business} from "@/features/business/business.types";

export interface BusinessContextType {
  currentBusiness: Business | null;
  isLoadingCurrentBusiness: boolean;
  loadCurrentBusinessError: string;
  loadCurrentBusiness: (businessId: string) => void;
}