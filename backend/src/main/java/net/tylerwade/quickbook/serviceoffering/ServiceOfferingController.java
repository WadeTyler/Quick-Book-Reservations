package net.tylerwade.quickbook.serviceoffering;

import net.tylerwade.quickbook.common.APIResponse;
import net.tylerwade.quickbook.exception.HttpRequestException;
import net.tylerwade.quickbook.serviceoffering.dto.ServiceOfferingDTO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/businesses/{businessId}/services")
public class ServiceOfferingController {

    private final ServiceOfferingService serviceOfferingService;

    public ServiceOfferingController(ServiceOfferingService serviceOfferingService) {
        this.serviceOfferingService = serviceOfferingService;
    }

    @GetMapping
    public ResponseEntity<?> findAll(@PathVariable String businessId) throws HttpRequestException {
        List<ServiceOfferingDTO> serviceOfferings = serviceOfferingService.findAll(businessId).stream()
                .map(ServiceOffering::toDTO)
                .toList();

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(new APIResponse<>(true, "Services retrieved.", serviceOfferings));
    }

    @GetMapping("/{serviceId}")
    public ResponseEntity<?> findById(@PathVariable String businessId, @PathVariable Long serviceId) throws HttpRequestException {
        ServiceOfferingDTO serviceOffering = serviceOfferingService.findById(businessId, serviceId).toDTO();

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(new APIResponse<>(true, "Service retrieved.", serviceOffering));
    }
}
