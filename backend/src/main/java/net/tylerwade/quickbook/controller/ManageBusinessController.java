package net.tylerwade.quickbook.controller;

import net.tylerwade.quickbook.dto.api.APIResponse;
import net.tylerwade.quickbook.exception.HttpRequestException;
import net.tylerwade.quickbook.service.BusinessService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
        return ResponseEntity.status(HttpStatus.OK).body(
                new APIResponse<>(true, "Business retrieved.", businessService.findByIdAndOwnerOrStaff(businessId, authentication))
        );
    }

}
