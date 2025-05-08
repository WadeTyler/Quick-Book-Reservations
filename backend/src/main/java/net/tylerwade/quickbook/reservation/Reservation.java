package net.tylerwade.quickbook.reservation;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import net.tylerwade.quickbook.reservation.dto.ReservationDTO;
import net.tylerwade.quickbook.serviceoffering.ServiceOffering;

import java.sql.Date;
import java.sql.Time;
import java.sql.Timestamp;

@Entity
@Table(name = "reservations")
@Getter
@Setter
@NoArgsConstructor
public class Reservation {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "service_offering_id", nullable = false)
    private ServiceOffering serviceOffering;

    @Column(nullable = false, length = 100)
    private String firstName;

    @Column(nullable = false, length = 100)
    private String lastName;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false, length = 20)
    private String phoneNumber;

    @Column(nullable = false)
    private Date date;

    @Column(nullable = false)
    private Time time;

    @Column(nullable = false)
    private Timestamp createdAt = new Timestamp(System.currentTimeMillis());

    public Reservation(ServiceOffering serviceOffering, String firstName, String lastName, String email, String phoneNumber, Date date, Time time) {
        this.serviceOffering = serviceOffering;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.date = date;
        this.time = time;
    }

    // --- UTIL Function
    @JsonIgnore
    public ReservationDTO toDTO() {
        return new ReservationDTO(id,
                serviceOffering.getId(),
                firstName,
                lastName,
                email,
                phoneNumber,
                date,
                time,
                createdAt);
    }
}
