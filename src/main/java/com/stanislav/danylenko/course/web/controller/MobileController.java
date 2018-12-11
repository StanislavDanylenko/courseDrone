package com.stanislav.danylenko.course.web.controller;

import com.fasterxml.jackson.annotation.JsonView;
import com.stanislav.danylenko.course.JsonRules;
import com.stanislav.danylenko.course.db.entity.LocalProposal;
import com.stanislav.danylenko.course.db.entity.Proposal;
import com.stanislav.danylenko.course.db.entity.User;
import com.stanislav.danylenko.course.db.entity.location.Country;
import com.stanislav.danylenko.course.exception.DBException;
import com.stanislav.danylenko.course.service.LocalProposalService;
import com.stanislav.danylenko.course.service.MobileService;
import com.stanislav.danylenko.course.service.ProposalService;
import com.stanislav.danylenko.course.service.UserService;
import com.stanislav.danylenko.course.service.location.CountryService;
import com.stanislav.danylenko.course.web.model.mobile.UserCredentialsModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/mobile")
public class MobileController {

    @Autowired
    private MobileService service;
    @Autowired
    private UserService userService;
    @Autowired
    private CountryService countryService;
    @Autowired
    private LocalProposalService localProposalService;

    @JsonView(value = JsonRules.MobileCustom.class)
    @PostMapping("/{id}")
    public @ResponseBody
    ResponseEntity<User> getUser(@RequestBody UserCredentialsModel model, @PathVariable Long id) throws DBException {
        User user = service.authenticateUser(model.getEmail(), model.getPassword());
        if (user != null) {
            return new ResponseEntity<>(userService.find(user.getId()), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }

    @PostMapping("/location/full")
    public ResponseEntity<Iterable<Country>> getCountriesFull(@RequestBody UserCredentialsModel model) throws DBException {
        User user = service.authenticateUser(model.getEmail(), model.getPassword());
        if (user != null) {
            return ResponseEntity.ok(countryService.findAll());
        } else {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }

    @JsonView(value = JsonRules.MobileProposal.class)
    @PostMapping("/proposal/point/{id}")
    public ResponseEntity<Iterable<LocalProposal>> getCountriesFull(@RequestBody UserCredentialsModel model, @PathVariable Long id) throws DBException {
        User user = service.authenticateUser(model.getEmail(), model.getPassword());
        if (user != null) {
            return ResponseEntity.ok(localProposalService.findAllByPopulatedPointAndActivity(id, true));
        } else {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }


}
