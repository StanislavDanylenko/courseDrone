package com.stanislav.danylenko.course.db.repository;

import com.stanislav.danylenko.course.db.entity.Sensor;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SensorRepository extends JpaRepository<Sensor, Long> {
}
