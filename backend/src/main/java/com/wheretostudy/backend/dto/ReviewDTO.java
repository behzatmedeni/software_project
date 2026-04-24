package com.wheretostudy.backend.dto;

import lombok.*;

import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReviewDTO {
    private UUID id;
    private UUID cafeId;
    private String userName;
    private Integer starRating;
    private String comment;
    private String photoUrl;
    private LocalDateTime createdAt;
}
