package com.stanislav.danylenko.course.db.repository;

import com.stanislav.danylenko.course.db.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role, Long> {
}
