package com.stanislav.danylenko.course.web.controller;

import com.stanislav.danylenko.course.db.entity.Role;
import com.stanislav.danylenko.course.db.entity.User;
import com.stanislav.danylenko.course.db.enumeration.TypeOfUser;
import com.stanislav.danylenko.course.db.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService service;

    @GetMapping(path="/add") // Map ONLY GET Requests
    public @ResponseBody
    String addNewUser (@RequestParam String name
            , @RequestParam String email) {
        // @ResponseBody means the returned String is the response, not a view name
        // @RequestParam means it is a parameter from the GET or POST request

        User n = new User();
        n.setType(TypeOfUser.BUSINESS);
        n.setFirstName(name);
        n.setEmail(email);
        service.save(n);
        return "Saved";
    }

    @GetMapping(path="/all")
    public @ResponseBody Iterable<User> getAllUsers() {
        return service.readAll();
    }

}
