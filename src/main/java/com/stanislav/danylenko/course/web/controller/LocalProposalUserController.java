package com.stanislav.danylenko.course.web.controller;

import com.stanislav.danylenko.course.db.entity.LocalProposal;
import com.stanislav.danylenko.course.db.entity.LocalProposalUser;
import com.stanislav.danylenko.course.db.entity.pk.LocalProposalPK;
import com.stanislav.danylenko.course.db.enumeration.OperationStatus;
import com.stanislav.danylenko.course.exception.DBException;
import com.stanislav.danylenko.course.service.LocalProposalService;
import com.stanislav.danylenko.course.service.LocalProposalUserService;
import com.stanislav.danylenko.course.web.model.LocalProposalModel;
import com.stanislav.danylenko.course.web.model.LocalProposalUserModel;
import com.stanislav.danylenko.course.web.model.ReportModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/userProposals")
public class LocalProposalUserController {

    @Autowired
    private LocalProposalUserService service;

    @Autowired
    private LocalProposalService localProposalService;

    @GetMapping
    @PreAuthorize("hasAuthority('ADMIN')")
    public @ResponseBody
    ResponseEntity<Iterable<LocalProposalUser>> getLocalProposalUsers() throws DBException {
        return ResponseEntity.ok(service.findAll());
    }

    @GetMapping("/user/{id}")
    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('USER')")
    public @ResponseBody
    ResponseEntity<Iterable<LocalProposalUser>> getLocalProposalUserByUser(@PathVariable Long id) throws DBException {
        return new ResponseEntity<>(service.findAllByUserId(id), HttpStatus.OK);
    }

    @GetMapping("/user/{id}/status/{status}")
    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('USER')")
    public @ResponseBody
    ResponseEntity<Iterable<LocalProposalUser>> getLocalProposalUserByUserAndStatus(@PathVariable Long id,
                                                                                    @PathVariable String status) throws DBException {

        switch (status) {
            case "FINALIZED":
                return new ResponseEntity<>(service.findAllByUserIdAndStatus(id, OperationStatus.FINALIZED), HttpStatus.OK);
            case "CANCELED":
                return new ResponseEntity<>(service.findAllByUserIdAndStatus(id, OperationStatus.CANCELED), HttpStatus.OK);
            default:
                return new ResponseEntity<>(service.findAllByUserIdAndStatusNot(id, OperationStatus.CANCELED, OperationStatus.FINALIZED), HttpStatus.OK);
        }
    }

    @GetMapping("/proposal/{id}")
    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('USER')")
    public @ResponseBody
    ResponseEntity<Iterable<LocalProposalUser>> getLocalProposalUserByProposal(@PathVariable Long id) throws DBException {
        return new ResponseEntity<>(service.findAllByProposalId(id), HttpStatus.OK);
    }

    @GetMapping("/point/{id}")
    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('USER')")
    public @ResponseBody
    ResponseEntity<Iterable<LocalProposalUser>> getLocalProposalUserByPopulatedPoint(@PathVariable Long id) throws DBException {
        return new ResponseEntity<>(service.findAllByPopulatedPointId(id), HttpStatus.OK);
    }

    @GetMapping("/localProposal")
    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('USER')")
    public @ResponseBody
    ResponseEntity<Iterable<LocalProposalUser>> getLocalProposalUserByLocalProposal(
            @RequestBody LocalProposalModel model) throws DBException {
        LocalProposalPK localProposalPK = new LocalProposalPK(model.getPopulatedPointId(), model.getProposalId());
        LocalProposal proposal = localProposalService.find(localProposalPK);
        return new ResponseEntity<>(service.findAllByLocalProposal(proposal), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('USER')")
    public @ResponseBody
    ResponseEntity<LocalProposalUser> getLocalProposalUser(@PathVariable String id) throws DBException {
        UUID uuid = UUID.fromString(id);
        LocalProposalUser localProposalUser = (service.findByUuid(uuid));
        return new ResponseEntity<>(localProposalUser, HttpStatus.OK);
    }

    @PostMapping
    @PreAuthorize("hasAuthority('ADMIN')")
    public @ResponseBody
    ResponseEntity<LocalProposalUser> createLocalProposalUser(@RequestBody LocalProposalUserModel model) throws Exception {
        LocalProposalUser localProposalUser = service.createLocalProposalUser(model);
        service.save(localProposalUser);
        return new ResponseEntity<>(localProposalUser, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public @ResponseBody
    ResponseEntity<LocalProposalUser> updateLocalProposalUser(@PathVariable String id, @RequestBody ReportModel model) throws DBException {
        UUID uuid = UUID.fromString(id);
        LocalProposalUser localProposalUser = service.findByUuid(uuid);
        service.updateLocalProposalUser(localProposalUser, model);
        service.update(localProposalUser);
        return ResponseEntity.ok(localProposalUser);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public void deleteLocalProposalUser(@PathVariable String id, HttpServletResponse response) throws DBException {
        service.delete(service.findByUuid(UUID.fromString(id)));
        response.setStatus(HttpServletResponse.SC_OK);
    }

    @DeleteMapping("/cancel/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public void cancelLocalProposalUser(@PathVariable String id, HttpServletResponse response) throws DBException {
        LocalProposalUser proposal = service.findByUuid(UUID.fromString(id));
        proposal.setStatus(OperationStatus.CANCELED);
        service.save(proposal);
        response.setStatus(HttpServletResponse.SC_OK);
    }
}
