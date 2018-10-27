package com.stanislav.danylenko.course;

import com.stanislav.danylenko.course.db.entity.User;
import com.stanislav.danylenko.course.db.enumeration.RoleUser;
import com.stanislav.danylenko.course.db.repository.*;
import com.stanislav.danylenko.course.db.repository.location.CountryRepository;
import com.stanislav.danylenko.course.db.repository.location.PopulatedPointRepository;
import com.stanislav.danylenko.course.db.repository.location.RegionRepository;
import com.stanislav.danylenko.course.db.service.UserService;
import lombok.extern.java.Log;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Slf4j
@Component
public class TestClass {

    @Autowired
    private UserService service;
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



    public void testUser() {

        System.out.println("////////////////////////////////////////\n");
        log.info("create user");
        User n = new User();
        n.setFirstName("name");
        n.setEmail("email");
        log.info("created user {}", n);
        service.save(n);

        try {
            Thread.sleep(500);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        log.info("updating user");
        User user  = service.read(1L);
        user.setPatronymic("patronimic");
        log.info("user from db {}", user);
        service.save(user);

        User user1  = new User();
        user1.setFirstName("name1");
        user1.setEmail("email1");
        user1.setPatronymic("patronimic1");
        log.info("updated user {}", user1);
        service.save(user1);

        List<User> userList = (List<User>)service.readAll();
        log.info("list of users {}", userList);

        service.delete(user);
        log.info("delete user {}", user);

        userList = (List<User>)service.readAll();
        log.info("list of users {}", userList);
    }

    void testUserAndRole() {

        System.out.println("////////////////////////////////////////\n");

        User user  = new User();
        user.setFirstName("name1");
        user.setEmail("email1");
        user.setPatronymic("patronimic1");
        log.info("updated user {}", user);
        service.save(user);


    }

}
