package com.stanislav.danylenko.course.web.controller.user;

import com.stanislav.danylenko.course.db.entity.User;
import com.stanislav.danylenko.course.db.entity.location.PopulatedPoint;
import com.stanislav.danylenko.course.exception.DBException;
import com.stanislav.danylenko.course.service.UserService;
import com.stanislav.danylenko.course.web.model.location.FullLocationModel;
import com.stanislav.danylenko.course.web.model.user.UserRegistrationModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService service;

    @GetMapping
    @PreAuthorize("hasAuthority('ADMIN')")
    public @ResponseBody
    ResponseEntity<Iterable<User>> getUsers() throws DBException {
        return ResponseEntity.ok(service.findAll());
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('USER')")
    public @ResponseBody
    ResponseEntity<User> getUser(@PathVariable Long id) throws DBException {
        return new ResponseEntity<>(service.find(id), HttpStatus.OK);
    }

    @PostMapping
    public @ResponseBody
    ResponseEntity<User> createUser(@RequestBody UserRegistrationModel userModel) throws DBException {
        User user = service.createFromRegistrationModel(userModel);
        service.save(user);
        return new ResponseEntity<>(user, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAuthority('USER')")
    public @ResponseBody
    ResponseEntity<User> updateUser(@RequestBody User newUser, @PathVariable Long id) throws DBException {
        User user = service.find(id);
        service.updateUser(user, newUser);
        service.update(user);
        return ResponseEntity.ok(user);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('USER')")
    public void deleteUser(@PathVariable Long id, HttpServletResponse response) throws DBException {
        User user = service.find(id);
        user.setActive(false);
        service.save(user);
        response.setStatus(HttpServletResponse.SC_OK);
    }

    @GetMapping("/{id}/location")
    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('USER')")
    public FullLocationModel getUserLocation(@PathVariable Long id) {
        User user = service.find(id);
        PopulatedPoint point = user.getDefaultPopulatedPoint();
        FullLocationModel model = new FullLocationModel();
        service.fillInfoAboutLocation(point);
        return model;
    }

}
