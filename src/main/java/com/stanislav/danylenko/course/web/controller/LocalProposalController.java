package com.stanislav.danylenko.course.web.controller;

import com.stanislav.danylenko.course.db.entity.Drone;
import com.stanislav.danylenko.course.db.entity.LocalProposal;
import com.stanislav.danylenko.course.db.entity.pk.LocalProposalPK;
import com.stanislav.danylenko.course.exception.DBException;
import com.stanislav.danylenko.course.service.LocalProposalService;
import com.stanislav.danylenko.course.web.model.LocalProposalModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.util.List;

@RestController
@RequestMapping("/localProposals")
public class LocalProposalController {

    @Autowired
    private LocalProposalService service;

    @GetMapping
    public @ResponseBody
    ResponseEntity<Iterable<LocalProposal>> getLocalProposals() throws DBException {
        return ResponseEntity.ok(service.findAll());
    }

    @GetMapping("/point/{id}")
    public @ResponseBody
    ResponseEntity<Iterable<LocalProposal>> getLocalProposalByPopulatedPoint(@PathVariable Long id) throws DBException {
        return new ResponseEntity<>(service.findByPopulatedPoint(id), HttpStatus.FOUND);
    }

    @GetMapping("/proposal/{id}")
    public @ResponseBody
    ResponseEntity<Iterable<LocalProposal>> getLocalProposalByProposal(@PathVariable Long id) throws DBException {
        return new ResponseEntity<>(service.findByProposal(id), HttpStatus.FOUND);
    }

    @PostMapping
    public @ResponseBody
    ResponseEntity<LocalProposal> createLocalProposal(@RequestBody LocalProposalModel model) throws DBException {
        LocalProposal localProposal = service.processLocalProposal(model);
        service.save(localProposal);
        return new ResponseEntity<>(localProposal, HttpStatus.CREATED);
    }

    @PutMapping
    public @ResponseBody
    ResponseEntity<LocalProposal> updateLocalProposal(@RequestBody LocalProposalModel model) throws DBException {
        LocalProposalPK pk = new LocalProposalPK(model.getPopulatedPointId(), model.getProposalId());
        LocalProposal localProposal = service.find(pk);
        List<Drone> updatedDrones = service.updateLocalProposal(localProposal, model);
        service.update(localProposal);

        /*for (Drone drone)*/

        return ResponseEntity.ok(localProposal);
    }

    @DeleteMapping
    public void deleteLocalProposal(@RequestBody LocalProposalModel model, HttpServletResponse response) throws DBException {
        LocalProposalPK pk = new LocalProposalPK(model.getPopulatedPointId(), model.getProposalId());
        service.delete(pk);
        response.setStatus(HttpServletResponse.SC_OK);
    }

}
