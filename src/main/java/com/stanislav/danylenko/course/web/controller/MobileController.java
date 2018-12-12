package com.stanislav.danylenko.course.web.controller;

import com.fasterxml.jackson.annotation.JsonView;
import com.stanislav.danylenko.course.JsonRules;
import com.stanislav.danylenko.course.db.entity.LocalProposal;
import com.stanislav.danylenko.course.db.entity.LocalProposalUser;
import com.stanislav.danylenko.course.db.entity.Proposal;
import com.stanislav.danylenko.course.db.entity.User;
import com.stanislav.danylenko.course.db.entity.location.Country;
import com.stanislav.danylenko.course.db.enumeration.OperationStatus;
import com.stanislav.danylenko.course.exception.DBException;
import com.stanislav.danylenko.course.service.*;
import com.stanislav.danylenko.course.service.location.CountryService;
import com.stanislav.danylenko.course.web.model.mobile.UserCredentialsModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
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
    @Autowired
    private LocalProposalUserService localProposalUserService;

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

    @JsonView(value = JsonRules.MobileProposal.class)
    @PostMapping("/user/{id}/status/{status}")
    public @ResponseBody
    ResponseEntity<Iterable<LocalProposalUser>> getLocalProposalUserByUserAndStatus(@RequestBody UserCredentialsModel model,
                                                                                    @PathVariable Long id,
                                                                                    @PathVariable String status) throws DBException {

        User user = service.authenticateUser(model.getEmail(), model.getPassword());
        if (user != null) {
            switch (status) {
                case "FINALIZED":
                    return new ResponseEntity<>(localProposalUserService.findAllByUserIdAndStatus(id, OperationStatus.FINALIZED), HttpStatus.OK);
                case "CANCELED":
                    return new ResponseEntity<>(localProposalUserService.findAllByUserIdAndStatus(id, OperationStatus.CANCELED), HttpStatus.OK);
                default:
                    return new ResponseEntity<>(localProposalUserService.findAllByUserIdAndStatusNot(id, OperationStatus.CANCELED, OperationStatus.FINALIZED), HttpStatus.OK);
            }
        } else {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

    }


}
