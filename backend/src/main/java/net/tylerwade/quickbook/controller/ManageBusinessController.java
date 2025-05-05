package net.tylerwade.quickbook.controller;

import jakarta.validation.Valid;
import net.tylerwade.quickbook.dto.api.APIResponse;
import net.tylerwade.quickbook.dto.business.CreateBusinessRequest;
import net.tylerwade.quickbook.dto.business.ManagedBusinessDTO;
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
    private ResponseEntity<?> findAllByOwnerOrStaff(Authentication authentication) throws HttpRequestException {
        return ResponseEntity.status(HttpStatus.OK).body(
                new APIResponse<>(true, "Businesses retrieved.", businessService.findAllByOwnerOrStaff(authentication))
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

}
