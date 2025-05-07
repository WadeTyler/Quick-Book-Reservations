package net.tylerwade.quickbook.controller;

import jakarta.validation.Valid;
import net.tylerwade.quickbook.dto.api.APIResponse;
import net.tylerwade.quickbook.dto.business.*;
import net.tylerwade.quickbook.dto.business.service.CreateServiceRequest;
import net.tylerwade.quickbook.exception.HttpRequestException;
import net.tylerwade.quickbook.model.Business;
import net.tylerwade.quickbook.service.BusinessService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/businesses/manage")
public class ManageBusinessController {
    private final BusinessService businessService;

    @Autowired
    public ManageBusinessController(BusinessService businessService) {
        this.businessService = businessService;
    }

    // Find all by owner or staff
    @GetMapping
    private ResponseEntity<?> findAllByOwnerOrStaff(Authentication authentication) {
        // Return normal DTOs
        List<BusinessDTO> businesses = businessService.findAllByOwnerOrStaff(authentication)
                .stream()
                .map(businessService::convertToDTO)
                .toList();

        return ResponseEntity.status(HttpStatus.OK).body(
                new APIResponse<>(true, "Businesses retrieved.", businesses)
        );
    }

    // Find all by id and owner or staff
    @GetMapping("/{businessId}")
    private ResponseEntity<?> findByIdAndOwnerOrStaff(Authentication authentication, @PathVariable String businessId) throws HttpRequestException {

        ManagedBusinessDTO managedBusinessDTO = businessService.convertToManagedBusinessDTO(
                businessService.findByIdAndOwnerOrStaff(businessId, authentication)
        );

        return ResponseEntity.status(HttpStatus.OK).body(
                new APIResponse<>(true, "Business retrieved.", managedBusinessDTO)
        );
    }

    // Create new Business
    @PostMapping(value = "/create", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    private ResponseEntity<?> create(Authentication authentication, @ModelAttribute @Valid CreateBusinessRequest createBusinessRequest) throws IOException {

        Business newBusiness = businessService.create(createBusinessRequest, authentication);
        return ResponseEntity.status(HttpStatus.CREATED).body(new APIResponse<>(true, "Business Created!", newBusiness));
    }

    // Add staff member to business
    @PostMapping("/{businessId}/staff")
    private ResponseEntity<?> addStaffMember(
            Authentication authentication,
            @PathVariable String businessId,
            @RequestBody @Valid StaffManagementDTO staffManagementDTO) throws HttpRequestException {

        Business updatedBusiness = businessService.addStaffMember(businessId, staffManagementDTO, authentication);
        ManagedBusinessDTO managedBusinessDTO = businessService.convertToManagedBusinessDTO(updatedBusiness);

        return ResponseEntity.status(HttpStatus.OK).body(
                new APIResponse<>(true, "Staff member added successfully.", managedBusinessDTO)
        );
    }

    // Remove staff member from business
    @DeleteMapping("/{businessId}/staff/{staffId}")
    private ResponseEntity<?> removeStaffMember(
            Authentication authentication,
            @PathVariable String businessId,
            @PathVariable String staffId) throws HttpRequestException {

        Business updatedBusiness = businessService.removeStaffMember(businessId, staffId, authentication);
        ManagedBusinessDTO managedBusinessDTO = businessService.convertToManagedBusinessDTO(updatedBusiness);

        return ResponseEntity.status(HttpStatus.OK).body(
                new APIResponse<>(true, "Staff member removed successfully.", managedBusinessDTO)
        );
    }

    @PutMapping("/{businessId}/details")
    private ResponseEntity<?> updateBusinessDetails(Authentication authentication, @PathVariable String businessId, @RequestBody @Valid UpdateBusinessDetailsRequest updateBusinessDetailsRequest) throws HttpRequestException {
        Business updatedBusiness = businessService.updatedBusinessDetails(businessId, updateBusinessDetailsRequest, authentication);
        ManagedBusinessDTO managedBusinessDTO = businessService.convertToManagedBusinessDTO(updatedBusiness);

        return ResponseEntity.status(HttpStatus.OK).body(
                new APIResponse<>(true, "Business details updated.", managedBusinessDTO)
        );
    }

    @PutMapping(value = "/{businessId}/image", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    private ResponseEntity<?> updateBusinessImage(Authentication authentication, @PathVariable String businessId, @ModelAttribute @Valid UpdateBusinessImageRequest updateBusinessImageRequest) throws IOException {
        Business updatedBusiness = businessService.updateBusinessImage(businessId, updateBusinessImageRequest, authentication);
        ManagedBusinessDTO managedBusinessDTO = businessService.convertToManagedBusinessDTO(updatedBusiness);

        return ResponseEntity.status(HttpStatus.OK).body(
                new APIResponse<>(true, "Business image updated.", managedBusinessDTO)
        );
    }

    @DeleteMapping("/{businessId}/image")
    private ResponseEntity<?> removeBusinessImage(Authentication authentication, @PathVariable String businessId) throws HttpRequestException {
        Business updatedBusiness = businessService.removeBusinessImage(businessId, authentication);
        ManagedBusinessDTO managedBusinessDTO = businessService.convertToManagedBusinessDTO(updatedBusiness);

        return ResponseEntity.status(HttpStatus.OK).body(
                new APIResponse<>(true, "Image removed.", managedBusinessDTO)
        );
    }

    @DeleteMapping("/{businessId}")
    private ResponseEntity<?> deleteBusiness(Authentication authentication, @PathVariable String businessId) throws HttpRequestException {
        businessService.deleteBusiness(businessId, authentication);
        return ResponseEntity.status(HttpStatus.OK).body(
                new APIResponse<>(true, "Business deleted.", null)
        );
    }

    @PostMapping(value = "/{businessId}/services", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    private ResponseEntity<?> createService(Authentication authentication, @PathVariable String businessId, @Valid @ModelAttribute CreateServiceRequest createServiceRequest) throws IOException {
        Business updatedBusiness = businessService.createService(businessId, createServiceRequest, authentication);
        ManagedBusinessDTO managedBusinessDTO = businessService.convertToManagedBusinessDTO(updatedBusiness);

        return ResponseEntity.status(HttpStatus.CREATED).body(
                new APIResponse<>(true, "Service created.", managedBusinessDTO)
        );
    }

    @DeleteMapping("/{businessId}/services/{serviceId}")
    private ResponseEntity<?> deleteService(Authentication authentication, @PathVariable String businessId, @PathVariable Long serviceId) throws HttpRequestException {
        Business updatedBusiness = businessService.deleteService(businessId, serviceId, authentication);
        ManagedBusinessDTO managedBusinessDTO = businessService.convertToManagedBusinessDTO(updatedBusiness);

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(new APIResponse<>(true, "Service deleted.", managedBusinessDTO));
    }

}
