package net.tylerwade.quickbook.reservation;

import net.tylerwade.quickbook.common.APIResponse;
import net.tylerwade.quickbook.exception.HttpRequestException;
import net.tylerwade.quickbook.reservation.dto.ReservationDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/businesses/manage/{businessId}/reservations")
public class ManageReservationsController {

    private final ReservationService reservationService;

    public ManageReservationsController(ReservationService reservationService) {
        this.reservationService = reservationService;
    }

    @GetMapping("/page")
    public ResponseEntity<?> findAll(Authentication authentication,
                                     @PathVariable String businessId,
                                     @RequestParam(required = false, defaultValue = "0") int pageNumber,
                                     @RequestParam(required = false, defaultValue = "25") int pageSize,
                                     @RequestParam(required = false, defaultValue = "date") String sort) throws HttpRequestException {
        Pageable pageable = PageRequest.of(pageNumber, pageSize, Sort.by(sort).descending());
        Page<ReservationDTO> reservations = reservationService.findAll(businessId, pageable, authentication)
                .map(Reservation::toDTO);

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(new APIResponse<>(true, "Reservations retrievaed.", reservations));
    }

    @GetMapping
    public ResponseEntity<?> findAll(Authentication authentication, @PathVariable String businessId) throws HttpRequestException {
        List<ReservationDTO> reservations = reservationService.findAll(businessId, authentication).stream().map(Reservation::toDTO).toList();
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(new APIResponse<>(true, "Reservations retrieved.", reservations));

    }
}
