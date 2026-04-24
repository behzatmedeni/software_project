package com.wheretostudy.backend.controller;

import com.wheretostudy.backend.dto.CafeDTO;
import com.wheretostudy.backend.dto.CafeDetailDTO;
import com.wheretostudy.backend.model.enums.TableSpace;
import com.wheretostudy.backend.model.enums.WifiQuality;
import com.wheretostudy.backend.service.CafeService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/cafes")
@RequiredArgsConstructor
@Tag(name = "Cafes", description = "Cafe discovery and detail endpoints")
public class CafeController {

    private final CafeService cafeService;

    @GetMapping
    @Operation(summary = "Get all cafes or filter by facilities", description = "Returns all cafes. Pass optional filter parameters to narrow results using AND logic.")
    public ResponseEntity<List<CafeDTO>> getCafes(
            @Parameter(description = "Filter by WiFi quality: NONE, SLOW, FAST, VERY_FAST") @RequestParam(required = false) WifiQuality wifiQuality,

            @Parameter(description = "Filter by power outlets availability") @RequestParam(required = false) Boolean powerOutlets,

            @Parameter(description = "Filter by quiet area availability") @RequestParam(required = false) Boolean quietArea,

            @Parameter(description = "Filter by table space: SMALL, MEDIUM, LARGE") @RequestParam(required = false) TableSpace tableSpace,

            @Parameter(description = "Filter by group friendliness") @RequestParam(required = false) Boolean groupFriendly,

            @Parameter(description = "Filter by voice meeting suitability") @RequestParam(required = false) Boolean voiceMeetings) {
        boolean hasFilters = wifiQuality != null || powerOutlets != null || quietArea != null
                || tableSpace != null || groupFriendly != null || voiceMeetings != null;

        List<CafeDTO> cafes;
        if (hasFilters) {
            cafes = cafeService.getFilteredCafes(wifiQuality, powerOutlets, quietArea,
                    tableSpace, groupFriendly, voiceMeetings);
        } else {
            cafes = cafeService.getAllCafes();
        }

        return ResponseEntity.ok(cafes);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get cafe details by ID", description = "Returns full cafe details including facilities and all reviews.")
    public ResponseEntity<CafeDetailDTO> getCafeById(
            @Parameter(description = "Cafe UUID") @PathVariable UUID id) {
        return ResponseEntity.ok(cafeService.getCafeById(id));
    }
}
