package com.wheretostudy.backend.dto;

import com.wheretostudy.backend.model.enums.TableSpace;
import com.wheretostudy.backend.model.enums.WifiQuality;
import lombok.*;

import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FacilityDTO {
    private WifiQuality wifiQuality;
    private Boolean powerOutlets;
    private Boolean quietArea;
    private TableSpace tableSpace;
    private Boolean groupFriendly;
    private Boolean voiceMeetings;
}
