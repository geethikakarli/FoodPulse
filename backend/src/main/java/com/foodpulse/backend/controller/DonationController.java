package com.foodpulse.backend.controller;
import com.foodpulse.backend.model.Donation;
import com.foodpulse.backend.model.DonationStatus;
import com.foodpulse.backend.repository.DonationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/donations")
@CrossOrigin(origins = "*")
public class DonationController {
    @Autowired
    private DonationRepository donationRepository;

    @PostMapping
    public Donation createDonation(@RequestBody Donation donation) {
        donation.setPostedAt(LocalDateTime.now());
        donation.setStatus(DonationStatus.POSTED);
        return donationRepository.save(donation);
    }

    @GetMapping
    public List<Donation> getAllDonations() {
        return donationRepository.findAll();
    }

    @PutMapping("/{id}/status")
    public Donation updateStatus(@PathVariable Long id, @RequestParam DonationStatus status) {
        Donation donation = donationRepository.findById(id).orElseThrow();
        donation.setStatus(status);
        return donationRepository.save(donation);
    }
}
