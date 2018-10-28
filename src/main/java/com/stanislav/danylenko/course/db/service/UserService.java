package com.stanislav.danylenko.course.db.service;

import com.stanislav.danylenko.course.db.entity.User;
import com.stanislav.danylenko.course.db.entity.location.PopulatedPoint;
import com.stanislav.danylenko.course.db.enumeration.RoleUser;
import com.stanislav.danylenko.course.db.repository.UserRepository;
import com.stanislav.danylenko.course.db.repository.location.PopulatedPointRepository;
import com.stanislav.danylenko.course.web.model.user.UserRegistrationModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    PopulatedPointRepository populatedPointRepository;

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

    public User find(Long id) {
        return repository.findById(id).orElse(null);
    }

    public Iterable<User> findAll() {
        return repository.findAll();
    }

    public User findByEmail(String email) {
        return repository.findByEmail(email);
    }

    public void updateUser(User oldUser, User newUser) {
        oldUser.setFirstName(newUser.getFirstName());
        oldUser.setLastName(newUser.getLastName());
        oldUser.setPatronymic(newUser.getPatronymic());
        oldUser.setPassword(newUser.getPassword());
        oldUser.setLocalization(newUser.getLocalization());
        oldUser.setDefaultPopulatedPoint(newUser.getDefaultPopulatedPoint());
    }

    public User createFromRegistrationModel(UserRegistrationModel model) {
        User user = new User();
        user.setFirstName(model.getFirstName());
        user.setLastName(model.getLastName());
        user.setPatronymic(model.getPatronymic());
        user.setLocalization(model.getLocalization());
        if (model.getDefaultPopulatedPointId() != null) {
            PopulatedPoint populatedPoint = populatedPointRepository.getOne(model.getDefaultPopulatedPointId());
            user.setDefaultPopulatedPoint(populatedPoint);
        }
        user.setEmail(model.getEmail());
        user.setType(model.getType());
        user.setPassword(model.getPassword());
        user.addRole(RoleUser.USER);
        user.setActive(true);
        return user;
    }

}

