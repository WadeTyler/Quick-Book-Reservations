package net.tylerwade.quickbook.reservation;

import jakarta.validation.Valid;
import net.tylerwade.quickbook.common.APIResponse;
import net.tylerwade.quickbook.reservation.dto.CreateReservationRequest;
import net.tylerwade.quickbook.reservation.dto.ReservationDTO;
import net.tylerwade.quickbook.exception.HttpRequestException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/businesses/{businessId}/services/{serviceId}/reservations")
public class ReservationController {

    private final ReservationService reservationService;

    public ReservationController(ReservationService reservationService) {
        this.reservationService = reservationService;
    }

    @PostMapping
    public ResponseEntity<?> createReservation(Authentication authentication, @PathVariable String businessId, @PathVariable Long serviceId, @RequestBody @Valid CreateReservationRequest createReservationRequest) throws HttpRequestException {
        ReservationDTO reservation = reservationService.createReservation(businessId, serviceId, createReservationRequest, authentication).toDTO();
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(new APIResponse<>(true, "Reservation created.", reservation));
    }

}
