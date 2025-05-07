package net.tylerwade.quickbook.repository;

import net.tylerwade.quickbook.model.Business;
import net.tylerwade.quickbook.model.Service;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ServiceRepository extends JpaRepository<Service, Long> {

    boolean existsByBusinessAndNameEqualsIgnoreCase(Business business, String name);

}
