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
    public ResponseEntity<?> findAllByOwnerOrStaff(Authentication authentication) {
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
    public ResponseEntity<?> findByIdAndOwnerOrStaff(Authentication authentication, @PathVariable String businessId) throws HttpRequestException {
        ManagedBusinessDTO managedBusinessDTO = businessService.findByIdAndOwnerOrStaff(businessId, authentication).toManagedBusinessDTO();

        return ResponseEntity.status(HttpStatus.OK).body(
                new APIResponse<>(true, "Business retrieved.", managedBusinessDTO)
        );
    }

    // Create new Business
    @PostMapping(consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<?> create(Authentication authentication, @ModelAttribute @Valid CreateBusinessRequest createBusinessRequest) throws IOException {

        ManagedBusinessDTO newBusiness = businessService.create(createBusinessRequest, authentication).toManagedBusinessDTO();
        return ResponseEntity.status(HttpStatus.CREATED).body(new APIResponse<>(true, "Business Created!", newBusiness));
    }

    // Add staff member to business
    @PostMapping("/{businessId}/staff")
    public ResponseEntity<?> addStaffMember(
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
    public ResponseEntity<?> removeStaffMember(
            Authentication authentication,
            @PathVariable String businessId,
            @PathVariable String staffId) throws HttpRequestException {

        ManagedBusinessDTO updatedBusiness = businessService.removeStaffMember(businessId, staffId, authentication).toManagedBusinessDTO();

        return ResponseEntity.status(HttpStatus.OK).body(
                new APIResponse<>(true, "Staff member removed successfully.", updatedBusiness)
        );
    }

    @PutMapping(value = "/{businessId}", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<?> update(Authentication authentication, @PathVariable String businessId, @ModelAttribute @Valid UpdateBusinessRequest updateBusinessRequest) throws IOException {
        ManagedBusinessDTO updatedBusiness = businessService.update(businessId, updateBusinessRequest, authentication).toManagedBusinessDTO();

        return ResponseEntity.status(HttpStatus.OK).body(
                new APIResponse<>(true, "Business details updated.", updatedBusiness)
        );
    }

    @DeleteMapping("/{businessId}")
    public ResponseEntity<?> deleteBusiness(Authentication authentication, @PathVariable String businessId) throws HttpRequestException {
        businessService.deleteBusiness(businessId, authentication);
        return ResponseEntity.status(HttpStatus.OK).body(
                new APIResponse<>(true, "Business deleted.", null)
        );
    }

}
