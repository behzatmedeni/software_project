package com.wheretostudy.backend.service;

import com.wheretostudy.backend.dto.CreateReviewDTO;
import com.wheretostudy.backend.dto.ReviewDTO;
import com.wheretostudy.backend.model.Cafe;
import com.wheretostudy.backend.model.Review;
import com.wheretostudy.backend.model.User;
import com.wheretostudy.backend.repository.CafeRepository;
import com.wheretostudy.backend.repository.ReviewRepository;
import com.wheretostudy.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ReviewService {

        private final ReviewRepository reviewRepository;
        private final CafeRepository cafeRepository;
        private final UserRepository userRepository;

        public List<ReviewDTO> getReviewsByCafeId(UUID cafeId) {
                return reviewRepository.findByCafeIdOrderByCreatedAtDesc(cafeId)
                                .stream()
                                .map(this::toReviewDTO)
                                .collect(Collectors.toList());
        }

        public ReviewDTO createReview(CreateReviewDTO dto) {
                User user = userRepository.findById(dto.getUserId())
                                .orElseGet(() -> userRepository.findAll().stream().findFirst()
                                                .orElseThrow(() -> new RuntimeException(
                                                                "No users available in the system")));
                Cafe cafe = cafeRepository.findById(dto.getCafeId())
                                .orElseThrow(() -> new RuntimeException("Cafe not found with id: " + dto.getCafeId()));

                Review review = Review.builder()
                                .user(user)
                                .cafe(cafe)
                                .starRating(dto.getStarRating())
                                .comment(dto.getComment())
                                .photoUrl(dto.getPhotoUrl())
                                .build();

                Review saved = reviewRepository.save(review);
                return toReviewDTO(saved);
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
