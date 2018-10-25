package com.stanislav.danylenko.course.web.controller;

import com.stanislav.danylenko.course.db.entity.Proposal;
import com.stanislav.danylenko.course.db.entity.Role;
import com.stanislav.danylenko.course.db.entity.User;
import com.stanislav.danylenko.course.db.repository.*;
import com.stanislav.danylenko.course.db.repository.location.CountryRepository;
import com.stanislav.danylenko.course.db.repository.location.PopulatedPointRepository;
import com.stanislav.danylenko.course.db.repository.location.RegionRepository;
import com.stanislav.danylenko.course.db.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService service;
    @Autowired
    private RoleRepository roleRepository;
    @Autowired
    private ProposalRepository proposalRepository;
    @Autowired
    private SensorRepository sensorRepository;
    @Autowired
    private DroneRepository droneRepository;
    @Autowired
    private CountryRepository countryRepository;
    @Autowired
    private RegionRepository regionRepository;
    @Autowired
    private PopulatedPointRepository populatedPointRepository;
    @Autowired
    private LocalProposalRepository localProposalRepository;
    @Autowired
    private ProposalUserRepository proposalUserRepository;

    @GetMapping(path="/add") // Map ONLY GET Requests
    public @ResponseBody
    String addNewUser (@RequestParam String name
            , @RequestParam String email) {
        // @ResponseBody means the returned String is the response, not a view name
        // @RequestParam means it is a parameter from the GET or POST request

        // role
        Role role = new Role("ADMIN");
        roleRepository.save(role);
        // user
        User n = new User();
        n.setFirstName(name);
        n.setEmail(email);
        Set<Role> roles = n.getRoles();
        roles.add(role);
        n.setRoles(roles);
        service.save(n);
        //

        return "Saved";
    }

    @GetMapping(path="/all")
    public @ResponseBody Iterable<User> getAllUsers() {
        return service.readAll();
    }

}
