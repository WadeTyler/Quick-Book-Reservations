import {
  Business,
  CreateBusinessRequest,
  ManagedBusiness,
  UpdateBusinessRequest
} from "@/features/business/business.types";
import {ManageServiceOfferingRequest} from "@/features/service-offering/service-offering.types";

export interface ManagedBusinessContextType {

  isCreatingBusiness: boolean;
  createBusinessError: string;
  createBusiness: (createRequest: CreateBusinessRequest) => Promise<ManagedBusiness | null>;

  managedBusinesses: Business[] | null;
  isLoadingManagedBusinesses: boolean;
  loadManagedBusinessesError: string;
  loadManagedBusinesses: () => void;

  managedBusiness: ManagedBusiness | null;
  isLoadingManagedBusiness: boolean;
  loadManagedBusinessError: string;
  loadManagedBusiness: (businessId: string) => Promise<ManagedBusiness | null>;

  isAddingStaff: boolean;
  addStaffError: string;
  addStaff: (businessId: string, email: string) => Promise<ManagedBusiness | null>;

  isRemovingStaff: boolean;
  removeStaffError: string;
  removeStaff: (businessId: string, userId: string) => Promise<ManagedBusiness | null>;

  isUpdating: boolean;
  updateError: string;
  update: (businessId: string, updateBusinessRequest: UpdateBusinessRequest) => Promise<ManagedBusiness | null>;

  isCreatingService: boolean;
  createServiceError: string;
  createService: (businessId: string, createRequest: ManageServiceOfferingRequest) => Promise<ManagedBusiness | null>;

  isUpdatingService: boolean;
  updateServiceError: string;
  updateService: (businessId: string, serviceId: number, updateRequest: ManageServiceOfferingRequest) => Promise<ManagedBusiness | null>;

  isDeletingService: boolean;
  deleteServiceError: string;
  deleteService: (businessId: string, serviceId: number) => Promise<ManagedBusiness | null>;

  isDeletingBusiness: boolean;
  deleteBusinessError: string;
  deleteBusiness: (businessId: string) => Promise<boolean>;
}