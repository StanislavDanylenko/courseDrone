package com.stanislav.danylenko.course.db.entity;

import com.stanislav.danylenko.course.db.entity.pk.LocalProposalUserPK;
import lombok.*;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PUBLIC)
@ToString
@IdClass(LocalProposalUserPK.class)
public class LocalProposalUser implements Serializable {

    @Id
    @ManyToOne
    @JoinColumns({
            @JoinColumn(name="LOC_POINT", referencedColumnName="populated_point_id"),
            @JoinColumn(name="LOC_PROP", referencedColumnName="proposal_id")
    })
    private LocalProposal localProposal;

    @Id
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

}
