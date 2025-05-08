package net.tylerwade.quickbook.controller;

import jakarta.validation.Valid;
import net.tylerwade.quickbook.dto.api.APIResponse;
import net.tylerwade.quickbook.dto.business.BusinessDTO;
import net.tylerwade.quickbook.dto.reservation.CreateReservationRequest;
import net.tylerwade.quickbook.dto.reservation.ReservationDTO;
import net.tylerwade.quickbook.exception.HttpRequestException;
import net.tylerwade.quickbook.model.Reservation;
import net.tylerwade.quickbook.service.BusinessService;
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
                .map(businessService::convertToDTO)
                .toList();

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(new APIResponse<>(true, "Businesses retrieved.", businesses));
    }

    @PostMapping("/{businessId}/services/{serviceId}/reservations")
    public ResponseEntity<?> createReservation(@PathVariable String businessId, @PathVariable Long serviceId, @RequestBody @Valid CreateReservationRequest createReservationRequest) throws HttpRequestException {
        Reservation reservation = businessService.createReservation(businessId, serviceId, createReservationRequest);
        ReservationDTO reservationDTO = businessService.convertToReservationDTO(reservation);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(new APIResponse<>(true, "Reservation created.", reservationDTO));
    }
}
