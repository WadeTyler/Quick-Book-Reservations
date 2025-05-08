package net.tylerwade.quickbook.repository;

import net.tylerwade.quickbook.model.Business;
import net.tylerwade.quickbook.model.ServiceOffering;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ServiceOfferingRepository extends JpaRepository<ServiceOffering, Long> {

    boolean existsByBusinessAndNameEqualsIgnoreCase(Business business, String name);
    boolean existsByBusinessAndNameEqualsIgnoreCaseAndIdNot(Business business, String name, Long serviceId);

}
