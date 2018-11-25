package com.stanislav.danylenko.course.web.controller;

import com.stanislav.danylenko.course.db.entity.LocalProposal;
import com.stanislav.danylenko.course.db.entity.pk.LocalProposalPK;
import com.stanislav.danylenko.course.exception.DBException;
import com.stanislav.danylenko.course.service.LocalProposalService;
import com.stanislav.danylenko.course.web.model.LocalProposalModel;
import com.sun.org.apache.xpath.internal.operations.Bool;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/localProposals")
public class LocalProposalController {

    @Autowired
    private LocalProposalService service;

    @GetMapping
    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('USER')")
    public @ResponseBody
    ResponseEntity<Iterable<LocalProposal>> getLocalProposals() throws DBException {
        return ResponseEntity.ok(service.findAll());
    }

    @PostMapping("/pk")
    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('USER')")
    public @ResponseBody
    ResponseEntity<LocalProposal> getLocalProposal(@RequestBody LocalProposalModel model) throws DBException {
        LocalProposalPK pk = new LocalProposalPK(model.getPopulatedPointId(), model.getProposalId());
        return ResponseEntity.ok(service.find(pk));
    }

    @GetMapping("/point/{id}")
    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('USER')")
    public @ResponseBody
    ResponseEntity<Iterable<LocalProposal>> getLocalProposalByPopulatedPoint(@PathVariable Long id) throws DBException {
        return new ResponseEntity<>(service.findByPopulatedPoint(id), HttpStatus.OK);
    }

    @GetMapping("/point/{id}/active/{isActive}")
    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('USER')")
    public @ResponseBody
    ResponseEntity<Iterable<LocalProposal>> getLocalProposalByActivity(@PathVariable Long id,
                                                                       @PathVariable Boolean isActive) throws DBException {
        return new ResponseEntity<>(service.findAllByPopulatedPointAndActivity(id, isActive), HttpStatus.OK);
    }

    @GetMapping("/proposal/{id}")
    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('USER')")
    public @ResponseBody
    ResponseEntity<Iterable<LocalProposal>> getLocalProposalByProposal(@PathVariable Long id) throws DBException {
        return new ResponseEntity<>(service.findByProposal(id), HttpStatus.OK);
    }

    @PostMapping
    @PreAuthorize("hasAuthority('ADMIN')")
    public @ResponseBody
    ResponseEntity<LocalProposal> createLocalProposal(@RequestBody LocalProposalModel model) throws DBException {
        LocalProposal localProposal = service.createLocalProposal(model);
        service.save(localProposal);
        return new ResponseEntity<>(localProposal, HttpStatus.CREATED);
    }

    @PutMapping
    @PreAuthorize("hasAuthority('ADMIN')")
    public @ResponseBody
    ResponseEntity<LocalProposal> updateLocalProposal(@RequestBody LocalProposalModel model) throws DBException {
        LocalProposal localProposal = service.updateLocalProposal(model);
        service.update(localProposal);
        return new ResponseEntity<>(localProposal, HttpStatus.OK);
    }

    @DeleteMapping
    @PreAuthorize("hasAuthority('ADMIN')")
    public void deleteLocalProposal(@RequestBody LocalProposalModel model, HttpServletResponse response) throws DBException {
        LocalProposalPK pk = new LocalProposalPK(model.getPopulatedPointId(), model.getProposalId());
        service.delete(pk);
        response.setStatus(HttpServletResponse.SC_OK);
    }

}
