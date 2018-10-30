package com.stanislav.danylenko.course.web.controller;

import com.stanislav.danylenko.course.db.entity.LocalProposal;
import com.stanislav.danylenko.course.db.entity.LocalProposalUser;
import com.stanislav.danylenko.course.db.entity.pk.LocalProposalPK;
import com.stanislav.danylenko.course.exception.DBException;
import com.stanislav.danylenko.course.service.LocalProposalService;
import com.stanislav.danylenko.course.service.LocalProposalUserService;
import com.stanislav.danylenko.course.web.model.LocalProposalModel;
import com.stanislav.danylenko.course.web.model.LocalProposalUserModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.util.UUID;

@RestController
@RequestMapping("/userProposals")
public class LocalProposalUserController {

    @Autowired
    private LocalProposalUserService service;

    @Autowired
    private LocalProposalService localProposalService;

    @GetMapping
    public @ResponseBody
    ResponseEntity<Iterable<LocalProposalUser>> getLocalProposalUsers() throws DBException {
        return ResponseEntity.ok(service.findAll());
    }

    @GetMapping("/user/{id}")
    public @ResponseBody
    ResponseEntity<Iterable<LocalProposalUser>> getLocalProposalUserByUser(@PathVariable Long id) throws DBException {
        return new ResponseEntity<>(service.findAllByUserId(id), HttpStatus.FOUND);
    }

    @GetMapping("/proposal/{id}")
    public @ResponseBody
    ResponseEntity<Iterable<LocalProposalUser>> getLocalProposalUserByProposal(@PathVariable Long id) throws DBException {
        return new ResponseEntity<>(service.findAllByProposalId(id), HttpStatus.FOUND);
    }

    @GetMapping("/point/{id}")
    public @ResponseBody
    ResponseEntity<Iterable<LocalProposalUser>> getLocalProposalUserByPopulatedPoint(@PathVariable Long id) throws DBException {
        return new ResponseEntity<>(service.findAllByPopulatedPointId(id), HttpStatus.FOUND);
    }

    @GetMapping("/localProposal")
    public @ResponseBody
    ResponseEntity<Iterable<LocalProposalUser>> getLocalProposalUserByLocalPropposal(
            @RequestBody LocalProposalModel model) throws DBException {
        LocalProposalPK localProposalPK = new LocalProposalPK(model.getPopulatedPointId(), model.getProposalId());
        LocalProposal proposal = localProposalService.find(localProposalPK);
        return new ResponseEntity<>(service.findAllByLocalProposal(proposal), HttpStatus.FOUND);
    }

    @GetMapping("/{id}")
    public @ResponseBody
    ResponseEntity<LocalProposalUser> getLocalProposalUser(@PathVariable String id) throws DBException {
        UUID uuid = UUID.fromString(id);
        LocalProposalUser localProposalUser = (service.findByUuid(uuid));
        return new ResponseEntity<>(localProposalUser, HttpStatus.FOUND);
    }

    @PostMapping
    public @ResponseBody
    ResponseEntity<LocalProposalUser> createLocalProposalUser(@RequestBody LocalProposalUserModel model) throws DBException {
        LocalProposalUser localProposalUser = service.processLocalProposalUser(model);
        service.save(localProposalUser);
        return new ResponseEntity<>(localProposalUser, HttpStatus.CREATED);
    }

   /* // todo write
    @PutMapping
    public @ResponseBody
    void updateLocalProposalUser(ReportModel model) throws DBException {
        LocalProposalUser localProposalUser = service.findByUuid(model.getUuid());
        service.updateLocalProposalUser(localProposalUser, model);
    }*/

    @DeleteMapping("/{id}")
    public void deleteLocalProposalUser(@PathVariable String id, HttpServletResponse response) throws DBException {
        service.delete(service.findByUuid(UUID.fromString(id)));
        response.setStatus(HttpServletResponse.SC_OK);
    }
}
