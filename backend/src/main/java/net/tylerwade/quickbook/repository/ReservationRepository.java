package net.tylerwade.quickbook.repository;

import net.tylerwade.quickbook.model.Reservation;
import net.tylerwade.quickbook.model.Service;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.sql.Date;
import java.sql.Time;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Long> {

    boolean existsByServiceAndDateAndTime(Service service, Date date, Time time);
}
