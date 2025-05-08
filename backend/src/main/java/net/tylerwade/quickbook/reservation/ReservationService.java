package net.tylerwade.quickbook.reservation;

import net.tylerwade.quickbook.reservation.dto.CreateReservationRequest;
import net.tylerwade.quickbook.exception.HttpRequestException;
import org.springframework.stereotype.Service;

@Service
public interface ReservationService {

    /**
     * Create a reservation
     * @param businessId The business id
     * @param serviceId The service id
     * @param createReservationRequest The request object containing the reservation details
     * @return the newly created reservation
     */
    Reservation createReservation(String businessId, Long serviceId, CreateReservationRequest createReservationRequest) throws HttpRequestException;
}
