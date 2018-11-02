package com.stanislav.danylenko.course.web.controller.user;

import com.stanislav.danylenko.course.db.entity.User;
import com.stanislav.danylenko.course.db.entity.location.PopulatedPoint;
import com.stanislav.danylenko.course.service.UserService;
import com.stanislav.danylenko.course.exception.DBException;
import com.stanislav.danylenko.course.web.model.location.FullLocationModel;
import com.stanislav.danylenko.course.web.model.user.UserRegistrationModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/admin/users")
@PreAuthorize("hasAuthority('ADMIN')")
public class UserAdminController {

    @Autowired
    private UserService service;

    @GetMapping
    public @ResponseBody
    ResponseEntity<Iterable<User>> getUsers() throws DBException {
        return ResponseEntity.ok(service.findAll());
    }

    @PostMapping
    public @ResponseBody
    ResponseEntity<User> createUser(@RequestBody UserRegistrationModel userModel) throws DBException {
        User user = service.createFromRegistrationModelAdmin(userModel);
        service.save(user);
        return new ResponseEntity<>(user, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public @ResponseBody
    ResponseEntity<User> updateUser(@RequestBody User newUser, @PathVariable Long id) throws DBException {
        User user = service.find(id);
        service.updateUserAdmin(user, newUser);
        service.update(user);
        return ResponseEntity.ok(user);
    }

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Long id, HttpServletResponse response) throws DBException {
        service.delete(id);
        response.setStatus(HttpServletResponse.SC_OK);
    }

}
