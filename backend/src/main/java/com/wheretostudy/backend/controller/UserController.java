package com.wheretostudy.backend.controller;

import com.wheretostudy.backend.dto.ReviewDTO;
import com.wheretostudy.backend.dto.UserProfileDTO;
import com.wheretostudy.backend.service.ReviewService;
import com.wheretostudy.backend.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
@Tag(name = "Users", description = "User profile and preference endpoints")
public class UserController {

    private final UserService userService;
    private final ReviewService reviewService;

    @GetMapping("/{userId}")
    @Operation(summary = "Get user profile")
    public ResponseEntity<UserProfileDTO> getUserProfile(@PathVariable UUID userId) {
        return ResponseEntity.ok(userService.getUserProfile(userId));
    }

    @PutMapping("/{userId}/preferences")
    @Operation(summary = "Update user study preferences")
    public ResponseEntity<UserProfileDTO> updatePreferences(
            @PathVariable UUID userId,
            @RequestBody Map<String, String> body) {
        String preferences = body.get("studyPreferences");
        return ResponseEntity.ok(userService.updateUserPreferences(userId, preferences));
    }

    @GetMapping("/{userId}/reviews")
    @Operation(summary = "Get user's reviews")
    public ResponseEntity<List<ReviewDTO>> getUserReviews(@PathVariable UUID userId) {
        return ResponseEntity.ok(reviewService.getReviewsByUserId(userId));
    }
}
