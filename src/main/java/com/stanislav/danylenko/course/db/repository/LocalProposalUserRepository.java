package com.stanislav.danylenko.course.db.repository;

import com.stanislav.danylenko.course.db.entity.LocalProposalUser;
import com.stanislav.danylenko.course.db.entity.pk.LocalProposalUserPK;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LocalProposalUserRepository extends JpaRepository<LocalProposalUser, LocalProposalUserPK> {
}
