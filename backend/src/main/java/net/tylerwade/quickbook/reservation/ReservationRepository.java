package net.tylerwade.quickbook.reservation;

import net.tylerwade.quickbook.serviceoffering.ServiceOffering;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.sql.Date;
import java.sql.Time;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Long> {

    boolean existsByServiceOfferingAndDateAndTime(ServiceOffering serviceOffering, Date date, Time time);
}
