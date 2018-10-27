package com.stanislav.danylenko.course;

import com.stanislav.danylenko.course.db.entity.User;
import com.stanislav.danylenko.course.db.entity.location.Country;
import com.stanislav.danylenko.course.db.entity.location.PopulatedPoint;
import com.stanislav.danylenko.course.db.entity.location.Region;
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

        User en = new User();
        en.setFirstName("name");
        log.info("created user {}", en);
        try {
            service.save(en);
        } catch (Exception e) {
            log.error("email is null");
        }


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
        user.setEmail("emailTeat");
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

    public void testUserAndRole() {

        System.out.println("////////////////////////////////////////\n");

        User user  = new User();
        user.setFirstName("name1");
        user.setEmail("ail1em");
        user.setPatronymic("patronimic1");
        log.info("create user {}", user);
        service.save(user);

        User fuser = service.findByEmail("ail1em");
        fuser.addRole(RoleUser.USER);
        log.info("added role {} to user {}", RoleUser.USER, fuser);
        service.save(fuser);

        User us = service.findByEmail("ail1em");
        log.info("list of user roles {}", us.getRoles());

        us.addRole(RoleUser.ADMIN);
        us.removeRole(RoleUser.USER);
        log.info("update user roles {}", us.getRoles());
        service.save(fuser);

        User us2 = service.findByEmail("ail1em");
        log.info("list of user roles {}", us2.getRoles());

    }

    public void testLocation() {

        System.out.println("////////////////////////////////////////\n");

        Country country1 = new Country();
        country1.setName("country");
        log.info("created country {}", country1);
        countryRepository.save(country1);

        //////////////////////////////////////////////

        Region region1 = new Region();
        region1.setName("region1");
        region1.setCountry(country1);
        log.info("created region {}", region1);
        regionRepository.save(region1);

        ///////////////////////////////////////////

        PopulatedPoint city1 = new PopulatedPoint();
        try {
            populatedPointRepository.save(city1);
        } catch (Exception e) {
            log.error("empty city name {}", city1);
        }

        //////////////////////////////

        PopulatedPoint city2 = new PopulatedPoint();
        city2.setName("city1");
        city2.setRegion(region1);
        populatedPointRepository.save(city2);
        log.info("created city {}", city2);

        //////////////////////////////////////////////

        Region region2 = regionRepository.findByName("region1");
        region2.setName("Changed_name");
        log.info("updated region {}" , region2);
        regionRepository.save(region2);

        ////////////////////////////////////

        PopulatedPoint populatedPoint = populatedPointRepository.findByName("city1");
        populatedPointRepository.delete(populatedPoint);
        log.info("deleted populated point {}" , populatedPoint);

        ////////////////////

        PopulatedPoint city3 = new PopulatedPoint();
        city3.setName("city3");
        city3.setRegion(region2);
        populatedPointRepository.save(city3);
        log.info("created city {}", city3);

        //////////////////////
        List<Country> countryList = countryRepository.findAll();
        log.info("Country list {}", countryList);

        List<Region> regionList = regionRepository.findAll();
        log.info("Region list {}", regionList);

        List<PopulatedPoint> populatedPointList = populatedPointRepository.findAll();
        log.info("Country list {}", populatedPointList);

        //////////////////////////////////

        Region regionFromList = countryList.get(0).getRegions().get(0);
        log.info("first region from country list {}", regionFromList);

    }



}
