package com.stanislav.danylenko.course.db.repository;

import com.stanislav.danylenko.course.db.entity.LocalProposal;
import com.stanislav.danylenko.course.db.entity.LocalProposalUser;
import com.stanislav.danylenko.course.db.entity.pk.LocalProposalPK;
import com.stanislav.danylenko.course.db.entity.pk.LocalProposalUserPK;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LocalProposalUserRepository extends JpaRepository<LocalProposalUser, LocalProposalUserPK> {
    Iterable<LocalProposalUser> findAllByLocalProposal_ProposalId(Long id);
    Iterable<LocalProposalUser> findAllByUserId(Long id);
    Iterable<LocalProposalUser> findAllByLocalProposal_PopulatedPointId(Long id);
    Iterable<LocalProposalUser> findAllByLocalProposal(LocalProposal pk);
}
