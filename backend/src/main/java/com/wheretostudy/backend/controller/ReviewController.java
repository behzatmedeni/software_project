package com.wheretostudy.backend.controller;

import com.wheretostudy.backend.dto.CreateReviewDTO;
import com.wheretostudy.backend.dto.ReviewDTO;
import com.wheretostudy.backend.service.ReviewService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@Tag(name = "Reviews", description = "Review management endpoints")
public class ReviewController {

    private final ReviewService reviewService;

    @GetMapping("/cafes/{cafeId}/reviews")
    @Operation(summary = "Get reviews for a cafe", description = "Returns all reviews for the specified cafe, ordered by newest first.")
    public ResponseEntity<List<ReviewDTO>> getReviewsByCafe(
            @Parameter(description = "Cafe UUID") @PathVariable UUID cafeId) {
        return ResponseEntity.ok(reviewService.getReviewsByCafeId(cafeId));
    }

    @PostMapping("/reviews")
    @Operation(summary = "Create a new review", description = "Submits a new review for a cafe. Requires valid user and cafe IDs.")
    public ResponseEntity<ReviewDTO> createReview(
            @Valid @RequestBody CreateReviewDTO dto) {
        ReviewDTO created = reviewService.createReview(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }
}
