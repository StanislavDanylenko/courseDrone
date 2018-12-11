package com.stanislav.danylenko.course.service;

import com.stanislav.danylenko.course.db.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class MobileService {

    @Autowired
    private UserService userService;

    public User authenticateUser(String email, String password) {
        User user = userService.findByEmail(email);
        if (user != null) {
            PasswordEncoder passwordEncoder = new BCryptPasswordEncoder(8);
            if (passwordEncoder.matches(password, user.getPassword())) {
                return user;
            }
        }
        return null;
    }

}
