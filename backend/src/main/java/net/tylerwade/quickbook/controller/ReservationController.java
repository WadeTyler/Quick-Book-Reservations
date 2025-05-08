package net.tylerwade.quickbook.controller;

import jakarta.validation.Valid;
import net.tylerwade.quickbook.dto.api.APIResponse;
import net.tylerwade.quickbook.dto.reservation.CreateReservationRequest;
import net.tylerwade.quickbook.dto.reservation.ReservationDTO;
import net.tylerwade.quickbook.exception.HttpRequestException;
import net.tylerwade.quickbook.service.ReservationService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/businesses/{businessId}/services/{serviceId}/reservations")
public class ReservationController {

    private final ReservationService reservationService;

    public ReservationController(ReservationService reservationService) {
        this.reservationService = reservationService;
    }

    @PostMapping
    public ResponseEntity<?> createReservation(@PathVariable String businessId, @PathVariable Long serviceId, @RequestBody @Valid CreateReservationRequest createReservationRequest) throws HttpRequestException {
        ReservationDTO reservation = reservationService.createReservation(businessId, serviceId, createReservationRequest).toDTO();
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(new APIResponse<>(true, "Reservation created.", reservation));
    }

}
