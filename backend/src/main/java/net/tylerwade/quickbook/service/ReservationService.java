package net.tylerwade.quickbook.service;

import net.tylerwade.quickbook.dto.reservation.CreateReservationRequest;
import net.tylerwade.quickbook.exception.HttpRequestException;
import net.tylerwade.quickbook.model.Reservation;
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
