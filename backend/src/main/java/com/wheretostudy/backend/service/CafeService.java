package com.wheretostudy.backend.service;

import com.wheretostudy.backend.dto.*;
import com.wheretostudy.backend.model.Cafe;
import com.wheretostudy.backend.model.Facility;
import com.wheretostudy.backend.model.Review;
import com.wheretostudy.backend.model.enums.TableSpace;
import com.wheretostudy.backend.model.enums.WifiQuality;
import com.wheretostudy.backend.repository.CafeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CafeService {

    private final CafeRepository cafeRepository;

    public List<CafeDTO> getAllCafes() {
        return cafeRepository.findAll().stream()
                .map(this::toCafeDTO)
                .collect(Collectors.toList());
    }

    public CafeDetailDTO getCafeById(UUID id) {
        Cafe cafe = cafeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Cafe not found with id: " + id));
        return toCafeDetailDTO(cafe);
    }

    public List<CafeDTO> getFilteredCafes(WifiQuality wifiQuality, Boolean powerOutlets,
            Boolean quietArea, TableSpace tableSpace,
            Boolean groupFriendly, Boolean voiceMeetings) {
        return cafeRepository.findByFilters(wifiQuality, powerOutlets, quietArea,
                tableSpace, groupFriendly, voiceMeetings)
                .stream()
                .map(this::toCafeDTO)
                .collect(Collectors.toList());
    }

    private CafeDTO toCafeDTO(Cafe cafe) {
        List<Review> reviews = cafe.getReviews();
        double avgRating = (reviews != null && !reviews.isEmpty())
                ? reviews.stream().mapToInt(Review::getStarRating).average().orElse(0.0)
                : 0.0;

        return CafeDTO.builder()
                .id(cafe.getId())
                .name(cafe.getName())
                .latitude(cafe.getLatitude())
                .longitude(cafe.getLongitude())
                .address(cafe.getAddress())
                .description(cafe.getDescription())
                .facility(toFacilityDTO(cafe.getFacility()))
                .averageRating(Math.round(avgRating * 10.0) / 10.0)
                .reviewCount(reviews != null ? reviews.size() : 0)
                .build();
    }

    private CafeDetailDTO toCafeDetailDTO(Cafe cafe) {
        List<Review> reviews = cafe.getReviews();
        double avgRating = (reviews != null && !reviews.isEmpty())
                ? reviews.stream().mapToInt(Review::getStarRating).average().orElse(0.0)
                : 0.0;

        List<ReviewDTO> reviewDTOs = (reviews != null)
                ? reviews.stream().map(this::toReviewDTO).collect(Collectors.toList())
                : List.of();

        return CafeDetailDTO.builder()
                .id(cafe.getId())
                .name(cafe.getName())
                .latitude(cafe.getLatitude())
                .longitude(cafe.getLongitude())
                .address(cafe.getAddress())
                .description(cafe.getDescription())
                .facility(toFacilityDTO(cafe.getFacility()))
                .averageRating(Math.round(avgRating * 10.0) / 10.0)
                .reviewCount(reviews != null ? reviews.size() : 0)
                .reviews(reviewDTOs)
                .build();
    }

    private FacilityDTO toFacilityDTO(Facility facility) {
        if (facility == null)
            return null;
        return FacilityDTO.builder()
                .wifiQuality(facility.getWifiQuality())
                .powerOutlets(facility.getPowerOutlets())
                .quietArea(facility.getQuietArea())
                .tableSpace(facility.getTableSpace())
                .groupFriendly(facility.getGroupFriendly())
                .voiceMeetings(facility.getVoiceMeetings())
                .build();
    }

    private ReviewDTO toReviewDTO(Review review) {
        return ReviewDTO.builder()
                .id(review.getId())
                .cafeId(review.getCafe().getId())
                .userName(review.getUser().getName())
                .starRating(review.getStarRating())
                .comment(review.getComment())
                .photoUrl(review.getPhotoUrl())
                .createdAt(review.getCreatedAt())
                .build();
    }
}
