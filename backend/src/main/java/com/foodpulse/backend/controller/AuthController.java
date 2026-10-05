package com.foodpulse.backend.controller;
import com.foodpulse.backend.model.User;
import com.foodpulse.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {
    @Autowired
    private UserRepository userRepository;

    @PostMapping("/register")
    public User register(@RequestBody User user) {
        // Mock register - saving directly without hashing for now
        return userRepository.save(user);
    }

    @PostMapping("/login")
    public User login(@RequestBody User loginUser) {
        // Mock login
        return userRepository.findByEmail(loginUser.getEmail())
                .filter(u -> u.getPassword().equals(loginUser.getPassword()))
                .orElseThrow(() -> new RuntimeException("Invalid credentials"));
    }
    
    @GetMapping("/users")
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
}
