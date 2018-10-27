package com.stanislav.danylenko.course.web.controller;

import com.stanislav.danylenko.course.TestClass;
import com.stanislav.danylenko.course.db.entity.LocalProposalUser;
import com.stanislav.danylenko.course.db.entity.User;
import com.stanislav.danylenko.course.db.entity.location.Country;
import com.stanislav.danylenko.course.db.entity.location.PopulatedPoint;
import com.stanislav.danylenko.course.db.entity.location.Region;
import com.stanislav.danylenko.course.db.repository.*;
import com.stanislav.danylenko.course.db.repository.location.CountryRepository;
import com.stanislav.danylenko.course.db.repository.location.PopulatedPointRepository;
import com.stanislav.danylenko.course.db.repository.location.RegionRepository;
import com.stanislav.danylenko.course.db.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService service;

    @Autowired
    private LocalProposalUserRepository repository;
    @Autowired
    private PopulatedPointRepository repoPopPoi;
    @Autowired
    private RegionRepository repoReg;
    @Autowired
    private CountryRepository repoCou;
    @Autowired
    TestClass test;

    @GetMapping(path="/add") // Map ONLY GET Requests
    public @ResponseBody
    String addNewUser (@RequestParam String name
            , @RequestParam String email) throws InterruptedException {
        // @ResponseBody means the returned String is the response, not a view name
        // @RequestParam means it is a parameter from the GET or POST request



        //repository.save();
        //test.testUser();
        //test.testUserAndRole();
        //test.testLocation();
        //test.testDroneWithSensors();
        test.testLocalProposeUser();


        return "tested";
    }

    @GetMapping(path="/all")
    public @ResponseBody Iterable<User> getAllUsers() {
        return service.readAll();
    }

}
