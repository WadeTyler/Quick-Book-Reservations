package net.tylerwade.quickbook.service;

import net.tylerwade.quickbook.dto.business.*;
import net.tylerwade.quickbook.dto.business.service.CreateServiceRequest;
import net.tylerwade.quickbook.dto.business.service.ServiceDTO;
import net.tylerwade.quickbook.exception.HttpRequestException;
import net.tylerwade.quickbook.model.Business;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

@Service
public interface BusinessService {

    // Get Business by id and owner
    Business findByIdAndOwner(String businessId, Authentication authentication) throws HttpRequestException;

    // Get All Businesses that user is owner or staff of
    List<Business> findAllByOwnerOrStaff(Authentication authentication);

    // Find one by id
    Business findByIdAndOwnerOrStaff(String businessId, Authentication authentication) throws HttpRequestException;

    // Create new Business
    Business create(CreateBusinessRequest createBusinessRequest, Authentication authentication) throws IOException;

    // Add staff member to business
    Business addStaffMember(String businessId, StaffManagementDTO staffManagementDTO, Authentication authentication) throws HttpRequestException;

    // Remove staff member from business
    Business removeStaffMember(String businessId, String staffId, Authentication authentication) throws HttpRequestException;

    // Update Business Details
    Business updatedBusinessDetails(String businessId, UpdateBusinessDetailsRequest updateBusinessDetailsRequest, Authentication authentication) throws HttpRequestException;

    // Update Business Image
    Business updateBusinessImage(String businessId, UpdateBusinessImageRequest updateBusinessImageRequest, Authentication authentication) throws IOException;

    // Remove Business Image
    Business removeBusinessImage(String businessId, Authentication authentication) throws HttpRequestException;

    // Delete Business
    void deleteBusiness(String businessId, Authentication authentication) throws HttpRequestException;

    // Create Service
    Business createService(String businessId, CreateServiceRequest createServiceRequest, Authentication authentication) throws IOException;

    // Delete Service
    Business deleteService(String businessId, Long serviceId, Authentication authentication) throws HttpRequestException;

    ManagedBusinessDTO convertToManagedBusinessDTO(Business business);

    BusinessDTO convertToDTO(Business business);

    ServiceDTO convertToServiceDTO(net.tylerwade.quickbook.model.Service service);

}
