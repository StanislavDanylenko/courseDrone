package com.stanislav.danylenko.course.web.controller.user;

import com.stanislav.danylenko.course.db.entity.User;
import com.stanislav.danylenko.course.db.entity.location.PopulatedPoint;
import com.stanislav.danylenko.course.db.enumeration.L10n;
import com.stanislav.danylenko.course.db.enumeration.TypeOfUser;
import com.stanislav.danylenko.course.db.service.UserService;
import com.stanislav.danylenko.course.exception.DBException;
import com.stanislav.danylenko.course.web.model.location.FullLocationModel;
import com.stanislav.danylenko.course.web.model.user.UserRegistrationModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService service;

    @GetMapping
    public @ResponseBody
    ResponseEntity<Iterable<User>> getUsers() throws DBException {
        return ResponseEntity.ok(service.findAll());
    }

    @GetMapping("/{id}")
    public @ResponseBody
    ResponseEntity<User> getUser(@PathVariable Long id) throws DBException {
        return new ResponseEntity<>(service.find(id), HttpStatus.FOUND);
    }

    @PostMapping
    public @ResponseBody
    ResponseEntity<User> createUser(@RequestBody UserRegistrationModel userModel) throws DBException {
        User user = service.createFromRegistrationModel(userModel);
        service.save(user);
        return new ResponseEntity<>(user, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public @ResponseBody
    ResponseEntity<User> updateUser(@RequestBody User newUser, @PathVariable Long id) throws DBException {
        User user = service.find(id);
        service.updateUser(user, newUser);
        service.update(user);
        return ResponseEntity.ok(user);
    }

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Long id, HttpServletResponse response) throws DBException {
        service.delete(id);
        response.setStatus(HttpServletResponse.SC_OK);
    }

    @GetMapping("/{id}/location")
    public FullLocationModel getUserLocation(@PathVariable Long id) {
        User user = service.find(id);
        PopulatedPoint point = user.getDefaultPopulatedPoint();
        FullLocationModel model = new FullLocationModel();
        service.fillInfoAboutLocation(point);
        return model;
    }

}
