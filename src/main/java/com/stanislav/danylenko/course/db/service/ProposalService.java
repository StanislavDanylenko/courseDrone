package com.stanislav.danylenko.course.db.service;

import com.stanislav.danylenko.course.db.entity.Proposal;
import com.stanislav.danylenko.course.db.repository.ProposalRepository;
import org.springframework.beans.factory.annotation.Autowired;

public class ProposalService implements GenericService<Proposal> {

    @Autowired
    private ProposalRepository repository;

    @Override
    public Proposal save(Proposal proposal) {
        return repository.save(proposal);
    }

    @Override
    public void delete(Proposal proposal) {
        repository.delete(proposal);
    }

    @Override
    public Proposal update(Proposal proposal) {
        return repository.save(proposal);
    }

    @Override
    public Proposal find(Long id) {
        return repository.findById(id).orElse(null);
    }

    @Override
    public Iterable<Proposal> findAll() {
        return repository.findAll();
    }

    @Override
    public void delete(Long id) {
        repository.deleteById(id);
    }
}
