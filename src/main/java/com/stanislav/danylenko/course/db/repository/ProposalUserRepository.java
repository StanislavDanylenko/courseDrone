package com.stanislav.danylenko.course.db.repository;

import com.stanislav.danylenko.course.db.entity.ProposalUser;
import com.stanislav.danylenko.course.db.entity.pk.ProposalUserPK;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProposalUserRepository extends JpaRepository<ProposalUser, ProposalUserPK> {
}
