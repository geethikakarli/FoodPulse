package com.foodpulse.backend.model;
import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;
@Data
@Entity
@Table(name = "donations")
public class Donation {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "donor_id")
    private User donor;
    @ManyToOne
    @JoinColumn(name = "ngo_id")
    private User ngo;
    private String foodImage;
    private String foodCategory;
    private String foodType;
    private String quantity;
    private String timeInformation;
    private String storageCondition;
    private LocalDateTime recommendedConsumptionTime;
    private LocalDateTime postedAt;
    @Enumerated(EnumType.STRING)
    private DonationStatus status;
}
