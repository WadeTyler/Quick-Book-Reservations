package net.tylerwade.quickbook.business;

import jakarta.validation.Valid;
import net.tylerwade.quickbook.business.dto.*;
import net.tylerwade.quickbook.common.APIResponse;
import net.tylerwade.quickbook.exception.HttpRequestException;
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
                .map(Business::toDTO)
                .toList();

        return ResponseEntity.status(HttpStatus.OK).body(
                new APIResponse<>(true, "Businesses retrieved.", businesses)
        );
    }

    // Find all by id and owner or staff
    @GetMapping("/{businessId}")
    private ResponseEntity<?> findByIdAndOwnerOrStaff(Authentication authentication, @PathVariable String businessId) throws HttpRequestException {
        ManagedBusinessDTO managedBusinessDTO = businessService.findByIdAndOwnerOrStaff(businessId, authentication).toManagedBusinessDTO();

        return ResponseEntity.status(HttpStatus.OK).body(
                new APIResponse<>(true, "Business retrieved.", managedBusinessDTO)
        );
    }

    // Create new Business
    @PostMapping(value = "/create", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    private ResponseEntity<?> create(Authentication authentication, @ModelAttribute @Valid CreateBusinessRequest createBusinessRequest) throws IOException {

        ManagedBusinessDTO newBusiness = businessService.create(createBusinessRequest, authentication).toManagedBusinessDTO();
        return ResponseEntity.status(HttpStatus.CREATED).body(new APIResponse<>(true, "Business Created!", newBusiness));
    }

    // Add staff member to business
    @PostMapping("/{businessId}/staff")
    private ResponseEntity<?> addStaffMember(
            Authentication authentication,
            @PathVariable String businessId,
            @RequestBody @Valid StaffManagementDTO staffManagementDTO) throws HttpRequestException {

        ManagedBusinessDTO updatedBusiness = businessService.addStaffMember(businessId, staffManagementDTO, authentication).toManagedBusinessDTO();

        return ResponseEntity.status(HttpStatus.OK).body(
                new APIResponse<>(true, "Staff member added successfully.", updatedBusiness)
        );
    }

    // Remove staff member from business
    @DeleteMapping("/{businessId}/staff/{staffId}")
    private ResponseEntity<?> removeStaffMember(
            Authentication authentication,
            @PathVariable String businessId,
            @PathVariable String staffId) throws HttpRequestException {

        ManagedBusinessDTO updatedBusiness = businessService.removeStaffMember(businessId, staffId, authentication).toManagedBusinessDTO();

        return ResponseEntity.status(HttpStatus.OK).body(
                new APIResponse<>(true, "Staff member removed successfully.", updatedBusiness)
        );
    }

    @PutMapping("/{businessId}/details")
    private ResponseEntity<?> updateBusinessDetails(Authentication authentication, @PathVariable String businessId, @RequestBody @Valid UpdateBusinessDetailsRequest updateBusinessDetailsRequest) throws HttpRequestException {
        ManagedBusinessDTO updatedBusiness = businessService.updatedBusinessDetails(businessId, updateBusinessDetailsRequest, authentication).toManagedBusinessDTO();

        return ResponseEntity.status(HttpStatus.OK).body(
                new APIResponse<>(true, "Business details updated.", updatedBusiness)
        );
    }

    @PutMapping(value = "/{businessId}/image", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    private ResponseEntity<?> updateBusinessImage(Authentication authentication, @PathVariable String businessId, @ModelAttribute @Valid UpdateBusinessImageRequest updateBusinessImageRequest) throws IOException {
        ManagedBusinessDTO updatedBusiness = businessService.updateBusinessImage(businessId, updateBusinessImageRequest, authentication).toManagedBusinessDTO();

        return ResponseEntity.status(HttpStatus.OK).body(
                new APIResponse<>(true, "Business image updated.", updatedBusiness)
        );
    }

    @DeleteMapping("/{businessId}/image")
    private ResponseEntity<?> removeBusinessImage(Authentication authentication, @PathVariable String businessId) throws HttpRequestException {
        ManagedBusinessDTO updatedBusiness = businessService.removeBusinessImage(businessId, authentication).toManagedBusinessDTO();

        return ResponseEntity.status(HttpStatus.OK).body(
                new APIResponse<>(true, "Image removed.", updatedBusiness)
        );
    }

    @DeleteMapping("/{businessId}")
    private ResponseEntity<?> deleteBusiness(Authentication authentication, @PathVariable String businessId) throws HttpRequestException {
        businessService.deleteBusiness(businessId, authentication);
        return ResponseEntity.status(HttpStatus.OK).body(
                new APIResponse<>(true, "Business deleted.", null)
        );
    }

}
