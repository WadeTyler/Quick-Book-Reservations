package net.tylerwade.quickbook.reservation;

import net.tylerwade.quickbook.serviceoffering.ServiceOffering;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.sql.Date;
import java.sql.Time;
import java.util.List;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Long> {

    boolean existsByServiceOfferingAndDateAndTime(ServiceOffering serviceOffering, Date date, Time time);

    Page<Reservation> findAllByServiceOffering_Business_Id(@Param("businessId") String businessId, Pageable pageable);
    List<Reservation> findAllByServiceOffering_Business_Id(@Param("businessId") String businessId);
}
