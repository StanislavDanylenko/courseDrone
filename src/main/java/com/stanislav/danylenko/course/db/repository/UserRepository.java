package com.stanislav.danylenko.course.db.repository;

import com.stanislav.danylenko.course.db.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String email);
}
