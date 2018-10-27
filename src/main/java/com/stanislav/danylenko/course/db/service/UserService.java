package com.stanislav.danylenko.course.db.service;

import com.stanislav.danylenko.course.db.entity.User;
import com.stanislav.danylenko.course.db.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository repository;

    public User save(User user) {
        return repository.save(user);
    }

    public void delete(User user) {
        repository.delete(user);
    }

    public User update(User user) {
        return repository.save(user);
    }

    public User read(Long id) {
        return repository.findById(id).orElse(null);
    }

    public Iterable<User> readAll() {
        return repository.findAll();
    }

    public User findByEmail(String email) {
        return repository.findByEmail(email);
    }

}

