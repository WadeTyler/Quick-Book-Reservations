package net.tylerwade.quickbook.reservation;

import net.tylerwade.quickbook.business.BusinessService;
import net.tylerwade.quickbook.reservation.dto.CreateReservationRequest;
import net.tylerwade.quickbook.exception.HttpRequestException;
import net.tylerwade.quickbook.business.Business;
import net.tylerwade.quickbook.serviceoffering.ServiceOffering;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.List;

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

        // Check if service enabled.
        if (!serviceOffering.isEnabled()) {
            throw new HttpRequestException(HttpStatus.NOT_ACCEPTABLE, "This service is currently not available for reservations.");
        }

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

    @Override
    public List<Reservation> findAll(String businessId, Authentication authentication) throws HttpRequestException {
        Business targetBusiness = businessService.findByIdAndOwnerOrStaff(businessId, authentication);
        return reservationRepository.findAllByServiceOffering_Business_Id(targetBusiness.getId());
    }

    @Override
    public Page<Reservation> findAll(String businessId, Pageable pageable, Authentication authentication) throws HttpRequestException {
        Business targetBusiness = businessService.findByIdAndOwnerOrStaff(businessId, authentication);
        return reservationRepository.findAllByServiceOffering_Business_Id(targetBusiness.getId(), pageable);
    }
}
