package com.stanislav.danylenko.course.service;

import com.stanislav.danylenko.course.db.entity.LocalProposal;
import com.stanislav.danylenko.course.db.entity.LocalProposalUser;
import com.stanislav.danylenko.course.db.entity.pk.LocalProposalPK;
import com.stanislav.danylenko.course.db.entity.pk.LocalProposalUserPK;
import com.stanislav.danylenko.course.db.repository.LocalProposalUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LocalProposalUserService {

    @Autowired
    private LocalProposalUserRepository repository;


    public LocalProposalUser save(LocalProposalUser localProposalUser) {
        return repository.save(localProposalUser);
    }

    public void delete(LocalProposalUser localProposalUser) {
        repository.delete(localProposalUser);
    }

    public LocalProposalUser update(LocalProposalUser localProposalUser) {
        return repository.save(localProposalUser);
    }

    public LocalProposalUser find(LocalProposalUserPK id) {
        return repository.findById(id).orElse(null);
    }

    public Iterable<LocalProposalUser> findAll() {
        return repository.findAll();
    }

    public void delete(LocalProposalUserPK id) {
        repository.deleteById(id);
    }

    public Iterable<LocalProposalUser> findAllByProposalId(Long id) {
        return repository.findAllByLocalProposal_ProposalId(id);
    }
    public Iterable<LocalProposalUser> findAllByUserId(Long id) {
        return repository.findAllByUserId(id);
    }
    public Iterable<LocalProposalUser> findAllByPopulatedPointId(Long id) {
        return repository.findAllByLocalProposal_PopulatedPointId(id);
    }
    public Iterable<LocalProposalUser> findAllByLocalProposal(LocalProposal id) {
        return repository.findAllByLocalProposal(id);
    }
}
