package com.stanislav.danylenko.course.db.repository.location;

import com.stanislav.danylenko.course.db.entity.location.Region;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RegionRepository extends JpaRepository<Region, Long> {
    Region findByName(String name);
}
