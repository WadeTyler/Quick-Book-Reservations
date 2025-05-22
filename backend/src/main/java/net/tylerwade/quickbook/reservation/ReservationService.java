package net.tylerwade.quickbook.reservation;

import net.tylerwade.quickbook.reservation.dto.CreateReservationRequest;
import net.tylerwade.quickbook.exception.HttpRequestException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface ReservationService {

    /**
     * Create a reservation
     * @param businessId The business id
     * @param serviceId The service id
     * @param createReservationRequest The request object containing the reservation details
     * @return the newly created reservation
     */
    Reservation createReservation(String businessId, Long serviceId, CreateReservationRequest createReservationRequest, Authentication authentication) throws HttpRequestException;

    List<Reservation> findAll(String businessId, Authentication authentication) throws HttpRequestException;
    Page<Reservation> findAll(String businessId, Pageable pageable, Authentication authentication) throws HttpRequestException;

}
