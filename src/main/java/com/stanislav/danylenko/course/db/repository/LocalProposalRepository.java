package com.stanislav.danylenko.course.db.repository;

import com.stanislav.danylenko.course.db.entity.LocalProposal;
import com.stanislav.danylenko.course.db.entity.pk.LocalProposalPK;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LocalProposalRepository extends JpaRepository<LocalProposal, LocalProposalPK> {

    Iterable<LocalProposal> findAllByPopulatedPointId(Long id);

    Iterable<LocalProposal> findAllByProposalId(Long id);

    Iterable<LocalProposal> findAllByPopulatedPointIdAndIsActive(Long id, Boolean isActive);
}
