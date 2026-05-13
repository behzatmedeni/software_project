package com.wheretostudy.backend.service;

import com.wheretostudy.backend.dto.UserProfileDTO;
import com.wheretostudy.backend.model.User;
import com.wheretostudy.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public UserProfileDTO getUserProfile(UUID userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return toUserProfileDTO(user);
    }

    public UserProfileDTO updateUserPreferences(UUID userId, String preferences) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        user.setStudyPreferences(preferences);
        User savedUser = userRepository.save(user);
        
        return toUserProfileDTO(savedUser);
    }

    private UserProfileDTO toUserProfileDTO(User user) {
        return UserProfileDTO.builder()
                .id(user.getId())
                .name(user.getName())
                .email(user.getEmail())
                .role(user.getRole())
                .studyPreferences(user.getStudyPreferences())
                .build();
    }
}
