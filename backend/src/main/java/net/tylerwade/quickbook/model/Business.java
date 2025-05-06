package net.tylerwade.quickbook.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

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
    @GeneratedValue(strategy = GenerationType.UUID)
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


    // --- UTIL FUNCTIONS ---
    public String getImageObjectKey() {
        return "business-image-" + id + ".jpg";
    }
}
