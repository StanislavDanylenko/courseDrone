package com.stanislav.danylenko.course.db.repository;

import com.stanislav.danylenko.course.db.entity.Drone;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DroneRepository extends JpaRepository<Drone, Long> {
    Drone findByName(String name);
    /*Iterable<Drone> findByLocalProposalPopulatedPointId(Long id);*/
}
