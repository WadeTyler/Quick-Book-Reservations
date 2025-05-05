package net.tylerwade.quickbook.repository;

import net.tylerwade.quickbook.model.Business;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BusinessRepository extends JpaRepository<Business, String> {

    @Query(value = "SELECT * FROM businesses b JOIN business_staff bs ON b.id = bs.business_id WHERE b.owner_id = ?1 OR bs.user_id = ?1", nativeQuery = true)
    List<Business> findAllByOwnerOrStaff(String userId);

    @Query(value = "SELECT b.* FROM businesses b JOIN business_staff bs ON b.id = bs.business_id WHERE b.id = ?1 AND (b.owner_id = ?2 OR bs.user_id = ?2)", nativeQuery = true)
    Optional<Business> findByIdAndOwnerOrStaff(String businessId, String userId);


}
