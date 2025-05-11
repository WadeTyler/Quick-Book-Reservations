package net.tylerwade.quickbook.business;

import net.tylerwade.quickbook.auth.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BusinessRepository extends JpaRepository<Business, String> {

    Optional<Business> findByIdAndOwner(String businessId, User owner);

    @Query("SELECT b FROM Business b WHERE b.owner = :user OR :user MEMBER OF b.staff")
    List<Business> findAllByOwnerOrStaff(@Param("user") User user);

    @Query("SELECT b FROM Business b WHERE b.id = :businessId AND (b.owner = :user OR :user MEMBER OF b.staff)")
    Optional<Business> findByIdAndOwnerOrStaff(@Param("businessId") String businessId, @Param("user") User user);

    boolean existsByName(String name);

    Long countAllByOwner(User owner);

    boolean existsByNameAndIdNot(String name, String businessId);

}
