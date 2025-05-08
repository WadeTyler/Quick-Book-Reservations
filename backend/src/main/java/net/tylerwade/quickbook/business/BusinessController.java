package net.tylerwade.quickbook.business;

import net.tylerwade.quickbook.common.APIResponse;
import net.tylerwade.quickbook.business.dto.BusinessDTO;
import net.tylerwade.quickbook.exception.HttpRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/businesses")
public class BusinessController {

    private final BusinessService businessService;

    @Autowired
    public BusinessController(BusinessService businessService) {
        this.businessService = businessService;
    }

    @GetMapping
    public ResponseEntity<?> findAll() {
        List<BusinessDTO> businesses = businessService.findAll().stream()
                .map(Business::toDTO)
                .toList();

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(new APIResponse<>(true, "Businesses retrieved.", businesses));
    }

    @GetMapping("/{businessId}")
    public ResponseEntity<?> findById(@PathVariable String businessId) throws HttpRequestException {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(new APIResponse<>(true,
                        "Business Retrieved.",
                        businessService.findById(businessId)));
    }

}
