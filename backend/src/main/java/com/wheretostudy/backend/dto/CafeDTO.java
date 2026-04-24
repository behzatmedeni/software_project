package com.wheretostudy.backend.dto;

import lombok.*;

import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CafeDTO {
    private UUID id;
    private String name;
    private Double latitude;
    private Double longitude;
    private String address;
    private String description;
    private FacilityDTO facility;
    private Double averageRating;
    private Integer reviewCount;
}
