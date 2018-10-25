package com.stanislav.danylenko.course.db.repository;

import com.stanislav.danylenko.course.db.entity.Proposal;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProposalRepository extends JpaRepository<Proposal, Long> {
}
