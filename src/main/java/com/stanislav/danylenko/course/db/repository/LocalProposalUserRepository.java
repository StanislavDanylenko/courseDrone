package com.stanislav.danylenko.course.db.repository;

import com.stanislav.danylenko.course.db.entity.LocalProposal;
import com.stanislav.danylenko.course.db.entity.LocalProposalUser;
import com.stanislav.danylenko.course.db.entity.pk.LocalProposalPK;
import com.stanislav.danylenko.course.db.entity.pk.LocalProposalUserPK;
import com.stanislav.danylenko.course.db.enumeration.OperationStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Map;
import java.util.UUID;

public interface LocalProposalUserRepository extends JpaRepository<LocalProposalUser, LocalProposalUserPK> {

    Iterable<LocalProposalUser> findAllByLocalProposal_ProposalId(Long id);

    Iterable<LocalProposalUser> findAllByUserId(Long id);

    Iterable<LocalProposalUser> findAllByUserIdAndStatus(Long id, OperationStatus status);

    Iterable<LocalProposalUser> findAllByUserIdAndStatusNotAndStatusNot(Long id, OperationStatus status1, OperationStatus status2);

    Iterable<LocalProposalUser> findAllByLocalProposal_PopulatedPointId(Long id);

    Iterable<LocalProposalUser> findAllByLocalProposal(LocalProposal pk);

    LocalProposalUser findByUuid(UUID uuid);

    Integer countByLocalProposal_ProposalId(Long id);

    Integer countByLocalProposalPopulatedPointId(Long id);
}
