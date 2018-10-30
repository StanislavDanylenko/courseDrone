package com.stanislav.danylenko.course.db.entity.pk;

import com.stanislav.danylenko.course.db.entity.pk.LocalProposalPK;
import lombok.*;

import javax.persistence.Embeddable;
import java.io.Serializable;
import java.util.UUID;

@Embeddable
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@EqualsAndHashCode
@ToString
public class LocalProposalUserPK implements Serializable {

    private LocalProposalPK localProposal;
    private Long user;
    private UUID uuid;

}
