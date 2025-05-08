package net.tylerwade.quickbook.serviceoffering;

import jakarta.validation.Valid;
import net.tylerwade.quickbook.common.APIResponse;
import net.tylerwade.quickbook.business.dto.ManagedBusinessDTO;
import net.tylerwade.quickbook.exception.HttpRequestException;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("/api/businesses/manage/{businessId}/services")
public class ManageServiceOfferingController {

    private final ServiceOfferingService serviceOfferingService;

    public ManageServiceOfferingController(ServiceOfferingService serviceOfferingService) {
        this.serviceOfferingService = serviceOfferingService;
    }


    @PostMapping(consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    private ResponseEntity<?> createService(Authentication authentication, @PathVariable String businessId, @Valid @ModelAttribute ManageServiceOfferingRequest manageServiceOfferingRequest) throws IOException {
        ManagedBusinessDTO updatedBusiness = serviceOfferingService.createService(businessId, manageServiceOfferingRequest, authentication).toManagedBusinessDTO();

        return ResponseEntity.status(HttpStatus.CREATED).body(
                new APIResponse<>(true, "Service created.", updatedBusiness)
        );
    }

    @DeleteMapping("/{serviceId}")
    private ResponseEntity<?> deleteService(Authentication authentication, @PathVariable String businessId, @PathVariable Long serviceId) throws HttpRequestException {
        ManagedBusinessDTO updatedBusiness = serviceOfferingService.deleteService(businessId, serviceId, authentication).toManagedBusinessDTO();

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(new APIResponse<>(true, "Service deleted.", updatedBusiness));
    }

    @PutMapping(value = "/{serviceId}", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    private ResponseEntity<?> updateService(Authentication authentication, @PathVariable String businessId, @PathVariable Long serviceId, @Valid @ModelAttribute ManageServiceOfferingRequest manageServiceOfferingRequest) throws IOException {
        ManagedBusinessDTO updatedBusiness = serviceOfferingService.updateService(businessId, serviceId, manageServiceOfferingRequest, authentication).toManagedBusinessDTO();

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(new APIResponse<>(true, "Service updated.", updatedBusiness));
    }
}
