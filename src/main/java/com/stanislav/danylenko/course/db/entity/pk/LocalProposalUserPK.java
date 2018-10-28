package com.stanislav.danylenko.course.db.entity.pk;

import com.stanislav.danylenko.course.db.entity.pk.LocalProposalPK;
import lombok.EqualsAndHashCode;

import javax.persistence.Embeddable;
import java.io.Serializable;

@Embeddable
@EqualsAndHashCode
public class LocalProposalUserPK implements Serializable {

    private LocalProposalPK localProposal;
    private Long user;

}
