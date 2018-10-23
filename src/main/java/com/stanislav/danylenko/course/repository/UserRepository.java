package com.stanislav.danylenko.course.repository;

import com.stanislav.danylenko.course.entity.User;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<User, Long> {

}
