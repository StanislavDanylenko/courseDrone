package com.stanislav.danylenko.course.web.controller;

import com.fasterxml.jackson.annotation.JsonView;
import com.stanislav.danylenko.course.JsonRules;
import com.stanislav.danylenko.course.db.entity.LocalProposal;
import com.stanislav.danylenko.course.db.entity.LocalProposalUser;
import com.stanislav.danylenko.course.db.entity.User;
import com.stanislav.danylenko.course.db.entity.location.Country;
import com.stanislav.danylenko.course.db.enumeration.OperationStatus;
import com.stanislav.danylenko.course.exception.DBException;
import com.stanislav.danylenko.course.service.LocalProposalService;
import com.stanislav.danylenko.course.service.LocalProposalUserService;
import com.stanislav.danylenko.course.service.MobileService;
import com.stanislav.danylenko.course.service.UserService;
import com.stanislav.danylenko.course.service.location.CountryService;
import com.stanislav.danylenko.course.web.model.LocalProposalUserModel;
import com.stanislav.danylenko.course.web.model.mobile.UserCredentialsModel;
import com.stanislav.danylenko.course.web.model.user.UpdatePasswordModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/mobile")
@PreAuthorize("hasAuthority('USER')")
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
    @GetMapping("/{id}")
    public @ResponseBody
    ResponseEntity<User> getUser(@PathVariable Long id) throws DBException {
        return new ResponseEntity<>(userService.find(id), HttpStatus.OK);
    }

    @GetMapping("/location/full")
    public ResponseEntity<Iterable<Country>> getCountriesFull() throws DBException {
        return ResponseEntity.ok(countryService.findAll());
    }

    @JsonView(value = JsonRules.MobileProposal.class)
    @GetMapping("/proposal/point/{id}")
    public ResponseEntity<Iterable<LocalProposal>> getProposalsByLocation(@PathVariable Long id) throws DBException {
        return ResponseEntity.ok(localProposalService.findAllByPopulatedPointAndActivity(id, true));
    }

    @JsonView(value = JsonRules.MobileProposal.class)
    @GetMapping("/user/{id}/status/{status}")
    public @ResponseBody
    ResponseEntity<Iterable<LocalProposalUser>> getLocalProposalUserByUserAndStatus(@PathVariable Long id,
                                                                                    @PathVariable String status)
                                                                                                throws DBException {

            switch (status) {
                case "FINALIZED":
                    return new ResponseEntity<>(localProposalUserService.findAllByUserIdAndStatus(id, OperationStatus.FINALIZED),
                            HttpStatus.OK);
                case "CANCELED":
                    return new ResponseEntity<>(localProposalUserService.findAllByUserIdAndStatus(id, OperationStatus.CANCELED),
                            HttpStatus.OK);
                default:
                    return new ResponseEntity<>(localProposalUserService.findAllByUserIdAndStatusNot(id, OperationStatus.CANCELED,
                            OperationStatus.FINALIZED), HttpStatus.OK);
            }
    }

    @JsonView(value = JsonRules.MobileProposal.class)
    @GetMapping("/user/{id}")
    public @ResponseBody
    ResponseEntity<Iterable<LocalProposalUser>> getLocalProposalUserByUser(@PathVariable Long id) throws DBException {
        return new ResponseEntity<>(localProposalUserService.findAllByUserId(id), HttpStatus.OK);
    }

    @JsonView(value = JsonRules.MobileCustom.class)
    @PutMapping("/{id}")
    public @ResponseBody
    ResponseEntity<User> updateUser(@RequestBody User newUser, @PathVariable Long id) throws DBException {
        User user = userService.find(id);
        userService.updateUser(user, newUser);
        userService.update(user);
        return ResponseEntity.ok(user);
    }

    @JsonView(value = JsonRules.MobileCustom.class)
    @PostMapping("/password")
    public @ResponseBody
    ResponseEntity<User> updatePassword(@RequestBody UpdatePasswordModel userModel) throws DBException {
        User user = userService.find(userModel.getId());
        boolean isChanged = userService.changePassword(userModel);
        if (isChanged) {
            return new ResponseEntity<>(user, HttpStatus.OK);
        }
        return new ResponseEntity<>(user, HttpStatus.CONFLICT);
    }

    ///////////////

    @JsonView(value = JsonRules.MobileProposal.class)
    @PostMapping("/proposal")
    public @ResponseBody
    ResponseEntity<LocalProposalUser> createLocalProposalUser(@RequestBody LocalProposalUserModel model) throws Exception {

        LocalProposalUser localProposalUser = localProposalUserService.createLocalProposalUser(model);
        localProposalUserService.save(localProposalUser);
        return new ResponseEntity<>(localProposalUser, HttpStatus.CREATED);
    }

}
