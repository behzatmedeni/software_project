package com.wheretostudy.backend.model;

import com.wheretostudy.backend.model.enums.TableSpace;
import com.wheretostudy.backend.model.enums.WifiQuality;
import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;

@Entity
@Table(name = "facilities")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Facility {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cafe_id", nullable = false, unique = true)
    private Cafe cafe;

    @Enumerated(EnumType.STRING)
    @Column(name = "wifi_quality", nullable = false)
    private WifiQuality wifiQuality;

    @Column(name = "power_outlets", nullable = false)
    private Boolean powerOutlets;

    @Column(name = "quiet_area", nullable = false)
    private Boolean quietArea;

    @Enumerated(EnumType.STRING)
    @Column(name = "table_space", nullable = false)
    private TableSpace tableSpace;

    @Column(name = "group_friendly", nullable = false)
    private Boolean groupFriendly;

    @Column(name = "voice_meetings", nullable = false)
    private Boolean voiceMeetings;
}
