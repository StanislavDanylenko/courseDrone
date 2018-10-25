package com.stanislav.danylenko.course.db.repository;

import com.stanislav.danylenko.course.db.entity.LocalProposal;
import com.stanislav.danylenko.course.db.entity.pk.LocalProposalPK;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LocalProposalRepository extends JpaRepository<LocalProposal, LocalProposalPK> {
}
