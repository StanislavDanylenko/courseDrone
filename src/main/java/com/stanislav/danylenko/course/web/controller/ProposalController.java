package com.stanislav.danylenko.course.web.controller;

import com.stanislav.danylenko.course.db.entity.Proposal;
import com.stanislav.danylenko.course.service.ProposalService;
import com.stanislav.danylenko.course.exception.DBException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/proposals")
public class ProposalController {
    
    @Autowired
    private ProposalService service;

    @GetMapping
    public @ResponseBody
    ResponseEntity<Iterable<Proposal>> getProposals() throws DBException {
        return ResponseEntity.ok(service.findAll());
    }

    @GetMapping("/{id}")
    public @ResponseBody
    ResponseEntity<Proposal> getProposal(@PathVariable Long id) throws DBException {
        return new ResponseEntity<>(service.find(id), HttpStatus.FOUND);
    }

    @PostMapping
    public @ResponseBody
    ResponseEntity<Proposal> createProposal(@RequestBody Proposal proposal) throws DBException {
        service.save(proposal);
        return new ResponseEntity<>(proposal, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public @ResponseBody
    ResponseEntity<Proposal> updateProposal(@RequestBody Proposal newProposal, @PathVariable Long id) throws DBException {
        Proposal proposal = service.find(id);
        service.updateProposal(proposal, newProposal);
        service.update(proposal);
        return ResponseEntity.ok(proposal);
    }

    @DeleteMapping("/{id}")
    public void deleteProposal(@PathVariable Long id, HttpServletResponse response) throws DBException {
        service.delete(id);
        response.setStatus(HttpServletResponse.SC_OK);
    }
    
}
