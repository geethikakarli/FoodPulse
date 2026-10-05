package com.foodpulse.backend.repository;
import com.foodpulse.backend.model.Donation;
import com.foodpulse.backend.model.User;
import com.foodpulse.backend.model.DonationStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
public interface DonationRepository extends JpaRepository<Donation, Long> {
    List<Donation> findByDonor(User donor);
    List<Donation> findByNgo(User ngo);
    List<Donation> findByStatus(DonationStatus status);
}
