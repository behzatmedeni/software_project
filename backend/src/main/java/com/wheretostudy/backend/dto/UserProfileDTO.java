package com.wheretostudy.backend.dto;

import com.wheretostudy.backend.model.enums.Role;
import lombok.*;

import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserProfileDTO {
    private UUID id;
    private String name;
    private String email;
    private Role role;
    private String studyPreferences;
}
