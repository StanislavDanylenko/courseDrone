package com.stanislav.danylenko.course.db.repository.location;

import com.stanislav.danylenko.course.db.entity.location.Country;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CountryRepository extends JpaRepository<Country, Long> {
}
