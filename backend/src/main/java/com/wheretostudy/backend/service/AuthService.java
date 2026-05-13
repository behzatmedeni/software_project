package com.wheretostudy.backend.service;

import com.wheretostudy.backend.dto.AuthResponseDTO;
import com.wheretostudy.backend.dto.LoginDTO;
import com.wheretostudy.backend.dto.RegisterDTO;
import com.wheretostudy.backend.model.User;
import com.wheretostudy.backend.model.enums.Role;
import com.wheretostudy.backend.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public AuthResponseDTO register(RegisterDTO dto) {
        // Check if email is already taken
        if (userRepository.existsByEmail(dto.getEmail())) {
            throw new RuntimeException("Bu email adresi zaten kullanılıyor");
        }

        // Build and save user
        User user = User.builder()
                .name(dto.getName())
                .email(dto.getEmail())
                .passwordHash(passwordEncoder.encode(dto.getPassword()))
                .role(Role.USER)
                .build();

        User savedUser = userRepository.save(user);

        return AuthResponseDTO.builder()
                .id(savedUser.getId())
                .name(savedUser.getName())
                .email(savedUser.getEmail())
                .role(savedUser.getRole().name())
                .message("Kayıt başarılı")
                .build();
    }

    public AuthResponseDTO login(LoginDTO dto) {
        // Find user by email
        User user = userRepository.findByEmail(dto.getEmail())
                .orElseThrow(() -> new RuntimeException("Email veya şifre hatalı"));

        // Verify password
        if (!passwordEncoder.matches(dto.getPassword(), user.getPasswordHash())) {
            throw new RuntimeException("Email veya şifre hatalı");
        }

        return AuthResponseDTO.builder()
                .id(user.getId())
                .name(user.getName())
                .email(user.getEmail())
                .role(user.getRole().name())
                .message("Giriş başarılı")
                .build();
    }
}
