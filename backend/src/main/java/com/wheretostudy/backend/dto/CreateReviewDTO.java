package com.wheretostudy.backend.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreateReviewDTO {

    @NotNull(message = "User ID is required")
    private UUID userId;

    @NotNull(message = "Cafe ID is required")
    private UUID cafeId;

    @NotNull(message = "Star rating is required")
    @Min(value = 1, message = "Rating must be at least 1")
    @Max(value = 5, message = "Rating must be at most 5")
    private Integer starRating;

    private String comment;
    private String photoUrl;
}
