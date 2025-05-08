package net.tylerwade.quickbook.service;

import net.tylerwade.quickbook.dto.reservation.CreateReservationRequest;
import net.tylerwade.quickbook.exception.HttpRequestException;
import net.tylerwade.quickbook.model.Business;
import net.tylerwade.quickbook.model.Reservation;
import net.tylerwade.quickbook.model.ServiceOffering;
import net.tylerwade.quickbook.repository.ReservationRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@Service
public class ReservationServiceImpl implements ReservationService {

    private final BusinessService businessService;
    private final ReservationRepository reservationRepository;

    public ReservationServiceImpl(BusinessService businessService, ReservationRepository reservationRepository) {
        this.businessService = businessService;
        this.reservationRepository = reservationRepository;
    }

    @Override
    public Reservation createReservation(String businessId, Long serviceId, CreateReservationRequest createReservationRequest) throws HttpRequestException {
        // Find the target business
        Business business = businessService.findById(businessId);

        // Find the target service
        ServiceOffering serviceOffering = business.getServiceOfferings().stream()
                .filter(s -> s.getId().equals(serviceId))
                .findFirst()
                .orElseThrow(() -> new HttpRequestException(HttpStatus.NOT_FOUND, "Service not found."));

        // Check if a reservation already exists for date and time
        if (reservationRepository.existsByServiceOfferingAndDateAndTime(serviceOffering, createReservationRequest.date(), createReservationRequest.time())) {
            throw new HttpRequestException(HttpStatus.NOT_ACCEPTABLE, "Date and Time not available.");
        }

        // Create new reservation
        Reservation reservation = new Reservation(serviceOffering,
                createReservationRequest.firstName(),
                createReservationRequest.lastName(),
                createReservationRequest.email(),
                createReservationRequest.phoneNumber(),
                createReservationRequest.date(),
                createReservationRequest.time());

        // Save reservation
        reservationRepository.save(reservation);

        // TODO: Queue Email task to send confirmation

        return reservation;
    }
}
