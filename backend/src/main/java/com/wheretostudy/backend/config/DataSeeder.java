package com.wheretostudy.backend.config;

import com.wheretostudy.backend.model.*;
import com.wheretostudy.backend.model.enums.*;
import com.wheretostudy.backend.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
@RequiredArgsConstructor
@Slf4j
public class DataSeeder implements CommandLineRunner {

        private final CafeRepository cafeRepository;
        private final FacilityRepository facilityRepository;
        private final UserRepository userRepository;
        private final ReviewRepository reviewRepository;

        @Override
        public void run(String... args) {
                log.info("Checking existing data...");
                reviewRepository.deleteAll();
                facilityRepository.deleteAll();
                cafeRepository.deleteAll();
                userRepository.deleteAll();

                log.info("Seeding database with sample data...");

                // ═══════════════════════════════════════════
                // Create test user
                // ═══════════════════════════════════════════
                User testUser = userRepository.save(User.builder()
                                .name("Janis Berzins")
                                .email("janis@rtu.lv")
                                .passwordHash("$2a$10$dummyhash123456789012345678901234567890")
                                .role(Role.USER)
                                .studyPreferences(
                                                "{\"preferred_noise\": \"quiet\", \"needs_wifi\": true, \"needs_power\": true}")
                                .build());

                User testUser2 = userRepository.save(User.builder()
                                .name("Liga Ozola")
                                .email("liga@rtu.lv")
                                .passwordHash("$2a$10$dummyhash123456789012345678901234567890")
                                .role(Role.USER)
                                .studyPreferences(
                                                "{\"preferred_noise\": \"moderate\", \"needs_wifi\": true, \"needs_power\": false}")
                                .build());

                // ═══════════════════════════════════════════
                // Cafe 1: MIIT Coffee — The perfect study spot
                // Near RTU Main Building, Kipsala
                // ═══════════════════════════════════════════
                Cafe cafe1 = cafeRepository.save(Cafe.builder()
                                .name("MIIT Coffee")
                                .latitude(56.9496)
                                .longitude(24.0684)
                                .address("Kipsalas iela 6, Riga, LV-1048")
                                .description(
                                                "A modern specialty coffee shop right next to RTU campus. Known for its fast Wi-Fi and study-friendly atmosphere with plenty of power outlets. Popular among engineering students.")
                                .build());

                facilityRepository.save(Facility.builder()
                                .cafe(cafe1)
                                .wifiQuality(WifiQuality.VERY_FAST)
                                .powerOutlets(true)
                                .quietArea(true)
                                .tableSpace(TableSpace.LARGE)
                                .groupFriendly(false)
                                .voiceMeetings(false)
                                .build());

                // ═══════════════════════════════════════════
                // Cafe 2: Rocket Bean Roastery — Group-friendly
                // Central Riga, walkable from RTU
                // ═══════════════════════════════════════════
                Cafe cafe2 = cafeRepository.save(Cafe.builder()
                                .name("Rocket Bean Roastery")
                                .latitude(56.9503)
                                .longitude(24.1147)
                                .address("Miera iela 29/31, Riga, LV-1001")
                                .description(
                                                "One of Riga's best specialty coffee roasters. Spacious interior with long communal tables, perfect for group projects. Energetic atmosphere - not the quietest, but great for collaborative work.")
                                .build());

                facilityRepository.save(Facility.builder()
                                .cafe(cafe2)
                                .wifiQuality(WifiQuality.FAST)
                                .powerOutlets(true)
                                .quietArea(false)
                                .tableSpace(TableSpace.MEDIUM)
                                .groupFriendly(true)
                                .voiceMeetings(true)
                                .build());

                // ═══════════════════════════════════════════
                // Cafe 3: Bibliotēka Cafe — Minimal amenities
                // Old Town Riga
                // ═══════════════════════════════════════════
                Cafe cafe3 = cafeRepository.save(Cafe.builder()
                                .name("Biblioteka No.1")
                                .latitude(56.9471)
                                .longitude(24.1064)
                                .address("Terbatas iela 2, Riga, LV-1050")
                                .description(
                                                "A cozy book-themed cafe in the heart of Old Town. Very quiet and peaceful, ideal for solo reading or light studying. Limited outlets and slow Wi-Fi — bring a full battery and your own hotspot.")
                                .build());

                facilityRepository.save(Facility.builder()
                                .cafe(cafe3)
                                .wifiQuality(WifiQuality.SLOW)
                                .powerOutlets(false)
                                .quietArea(true)
                                .tableSpace(TableSpace.SMALL)
                                .groupFriendly(false)
                                .voiceMeetings(false)
                                .build());

                // ═══════════════════════════════════════════
                // Cafe 4: Double Coffee — Full amenities hub
                // Near RTU, Āgenskalns area
                // ═══════════════════════════════════════════
                Cafe cafe4 = cafeRepository.save(Cafe.builder()
                                .name("Double Coffee RTU")
                                .latitude(56.9480)
                                .longitude(24.0720)
                                .address("Azenes iela 12, Riga, LV-1048")
                                .description(
                                                "A chain cafe located steps from RTU campus with everything a student needs. Blazing fast Wi-Fi, charging stations at every seat, spacious tables for laptops, and a dedicated quiet zone alongside group areas.")
                                .build());

                facilityRepository.save(Facility.builder()
                                .cafe(cafe4)
                                .wifiQuality(WifiQuality.VERY_FAST)
                                .powerOutlets(true)
                                .quietArea(false)
                                .tableSpace(TableSpace.LARGE)
                                .groupFriendly(true)
                                .voiceMeetings(true)
                                .build());

                // ═══════════════════════════════════════════
                // Cafe 5: Kalve Coffee — No Wi-Fi, analog vibes
                // Quiet corner near the Daugava river
                // ═══════════════════════════════════════════
                Cafe cafe5 = cafeRepository.save(Cafe.builder()
                                .name("Kalve Coffee")
                                .latitude(56.9445)
                                .longitude(24.0985)
                                .address("Smilsu iela 1, Riga, LV-1050")
                                .description(
                                                "An artisan coffee bar focused on pour-over and filter coffee. No Wi-Fi by design — they encourage analog work and mindful study. Very quiet, perfect for handwritten notes and textbook reading.")
                                .build());

                facilityRepository.save(Facility.builder()
                                .cafe(cafe5)
                                .wifiQuality(WifiQuality.NONE)
                                .powerOutlets(false)
                                .quietArea(true)
                                .tableSpace(TableSpace.MEDIUM)
                                .groupFriendly(false)
                                .voiceMeetings(false)
                                .build());

                // ═══════════════════════════════════════════
                // Sample Reviews
                // ═══════════════════════════════════════════
                reviewRepository.save(Review.builder()
                                .user(testUser)
                                .cafe(cafe1)
                                .starRating(5)
                                .comment("Perfect spot for exam prep! Fast Wi-Fi and plenty of outlets. The cold brew is amazing too.")
                                .createdAt(LocalDateTime.now().minusDays(5))
                                .build());

                reviewRepository.save(Review.builder()
                                .user(testUser2)
                                .cafe(cafe1)
                                .starRating(4)
                                .comment("Great for solo studying. Can get a bit crowded during lunch hours though.")
                                .createdAt(LocalDateTime.now().minusDays(3))
                                .build());

                reviewRepository.save(Review.builder()
                                .user(testUser)
                                .cafe(cafe2)
                                .starRating(4)
                                .comment(
                                                "Love the communal tables for group projects. Coffee is top-notch. A bit noisy but we needed the collaborative energy.")
                                .createdAt(LocalDateTime.now().minusDays(10))
                                .build());

                reviewRepository.save(Review.builder()
                                .user(testUser2)
                                .cafe(cafe3)
                                .starRating(3)
                                .comment(
                                                "Beautiful atmosphere but the Wi-Fi is almost unusable. Bring your own hotspot if you need internet.")
                                .createdAt(LocalDateTime.now().minusDays(7))
                                .build());

                reviewRepository.save(Review.builder()
                                .user(testUser)
                                .cafe(cafe4)
                                .starRating(5)
                                .comment(
                                                "Has everything! Used the voice meeting room for a remote interview. Best study cafe near RTU.")
                                .createdAt(LocalDateTime.now().minusDays(2))
                                .build());

                reviewRepository.save(Review.builder()
                                .user(testUser2)
                                .cafe(cafe4)
                                .starRating(4)
                                .comment("Reliable Wi-Fi and good food options. The charging stations are a lifesaver.")
                                .createdAt(LocalDateTime.now().minusDays(1))
                                .build());

                reviewRepository.save(Review.builder()
                                .user(testUser)
                                .cafe(cafe5)
                                .starRating(4)
                                .comment(
                                                "Surprisingly productive without Wi-Fi! Great for focused textbook reading. The pour-over is exceptional.")
                                .createdAt(LocalDateTime.now().minusDays(14))
                                .build());

                log.info("Database seeded successfully with 5 cafes, 2 users, and 7 reviews.");
        }
}
