package net.tylerwade.quickbook.serviceOffering;

import net.tylerwade.quickbook.business.Business;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ServiceOfferingRepository extends JpaRepository<ServiceOffering, Long> {

    boolean existsByBusinessAndNameEqualsIgnoreCase(Business business, String name);
    boolean existsByBusinessAndNameEqualsIgnoreCaseAndIdNot(Business business, String name, Long serviceId);

}
