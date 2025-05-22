package net.tylerwade.quickbook.business;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import net.tylerwade.quickbook.auth.User;
import net.tylerwade.quickbook.business.dto.BusinessDTO;
import net.tylerwade.quickbook.business.dto.ManagedBusinessDTO;
import net.tylerwade.quickbook.serviceoffering.ServiceOffering;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "businesses")
@Getter
@Setter
@NoArgsConstructor
public class Business {

    @Id
    @Column(nullable = false, length = 15)
    private String id;

    @ManyToOne
    @JoinColumn(name = "owner_id", nullable = false)
    @JsonIgnore
    private User owner;

    public String getOwnerId() {
        return owner.getId();
    }

    @Column(nullable = false, length = 100)
    private String name;

    private String image;

    @Column(nullable = false, length = 500)
    private String description;

    @Column(nullable = false)
    private Timestamp createdAt = new Timestamp(System.currentTimeMillis());

    // Join Table
    @ManyToMany
    @JoinTable(name = "business_staff",
            joinColumns = @JoinColumn(name = "business_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    @JsonIgnore
    private List<User> staff = new ArrayList<>();

    public List<String> getStaffIds() {
        return staff.stream()
                .map(User::getId)
                .toList();
    }

    @OneToMany(mappedBy = "business", orphanRemoval = true)
    @JsonIgnore
    private List<ServiceOffering> serviceOfferings = new ArrayList<>();

    public List<Long> getServiceIds() {
        return serviceOfferings.stream()
                .map(ServiceOffering::getId)
                .toList();
    }

    // --- UTIL FUNCTIONS ---
    public String getImageObjectKey() {
        return "business-image-" + id + ".jpg";
    }

    @JsonIgnore
    public ManagedBusinessDTO toManagedBusinessDTO() {
        return new ManagedBusinessDTO(id,
                name,
                image,
                description,
                createdAt,
                owner.toDTO(),
                staff.stream().map(User::toDTO).toList(),
                serviceOfferings.stream().mapToInt(s -> s.getReservations().size()).sum(),
                serviceOfferings.stream().map(ServiceOffering::toDTO).toList());
    }

    @JsonIgnore
    public BusinessDTO toDTO() {
        return new BusinessDTO(id,
                owner.getId(),
                name,
                image,
                description,
                createdAt,
                staff.stream().map(User::getId).toList(),
                serviceOfferings.stream().map(ServiceOffering::getId).toList());
    }
}
