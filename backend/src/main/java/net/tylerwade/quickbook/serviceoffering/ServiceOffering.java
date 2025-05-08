package net.tylerwade.quickbook.serviceoffering;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import net.tylerwade.quickbook.business.Business;
import net.tylerwade.quickbook.reservation.Reservation;
import net.tylerwade.quickbook.serviceoffering.dto.ServiceOfferingDTO;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "service_offerings")
@Getter
@Setter
@NoArgsConstructor
public class ServiceOffering {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "business_id", nullable = false)
    @JsonIgnore
    private Business business;

    @Column(length = 100, nullable = false)
    private String name;

    @Column(length = 100, nullable = false)
    private String type;

    @Column(length = 500, nullable = false)
    private String description;

    private String image;

    private Timestamp createdAt = new Timestamp(System.currentTimeMillis());

    @OneToMany(mappedBy = "serviceOffering", cascade = CascadeType.REMOVE)
    List<Reservation> reservations = new ArrayList<>();

    // --- UTIL FUNCTIONS ---
    @JsonIgnore
    public String getImageObjectKey() {
        return "service-image-" + id + ".jpg";
    }

    @JsonIgnore
    public ServiceOfferingDTO toDTO() {
        return new ServiceOfferingDTO(id,
                business.getId(),
                name,
                type,
                description,
                image,
                createdAt);
    }
}
