package com.stanislav.danylenko.course.db.repository.location;

import com.stanislav.danylenko.course.db.entity.location.PopulatedPoint;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PopulatedPointRepository extends JpaRepository<PopulatedPoint, Long> {

    PopulatedPoint findByName(String name);

    Iterable<PopulatedPoint> findAllByRegionId(Long id);
}
