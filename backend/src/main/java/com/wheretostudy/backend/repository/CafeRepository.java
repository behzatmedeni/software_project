package com.wheretostudy.backend.repository;

import com.wheretostudy.backend.model.Cafe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface CafeRepository extends JpaRepository<Cafe, UUID> {

    @Query("SELECT c FROM Cafe c JOIN c.facility f WHERE " +
           "(:wifiQuality IS NULL OR f.wifiQuality = :wifiQuality) AND " +
           "(:powerOutlets IS NULL OR f.powerOutlets = :powerOutlets) AND " +
           "(:quietArea IS NULL OR f.quietArea = :quietArea) AND " +
           "(:tableSpace IS NULL OR f.tableSpace = :tableSpace) AND " +
           "(:groupFriendly IS NULL OR f.groupFriendly = :groupFriendly) AND " +
           "(:voiceMeetings IS NULL OR f.voiceMeetings = :voiceMeetings)")
    List<Cafe> findByFilters(
            @Param("wifiQuality") com.wheretostudy.backend.model.enums.WifiQuality wifiQuality,
            @Param("powerOutlets") Boolean powerOutlets,
            @Param("quietArea") Boolean quietArea,
            @Param("tableSpace") com.wheretostudy.backend.model.enums.TableSpace tableSpace,
            @Param("groupFriendly") Boolean groupFriendly,
            @Param("voiceMeetings") Boolean voiceMeetings
    );
}
