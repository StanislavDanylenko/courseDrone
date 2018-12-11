package com.stanislav.danylenko.course.db.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonView;
import com.stanislav.danylenko.course.JsonRules;
import com.stanislav.danylenko.course.db.entity.location.PopulatedPoint;
import com.stanislav.danylenko.course.db.entity.pk.LocalProposalPK;
import lombok.*;

import javax.persistence.*;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PUBLIC)
@IdClass(LocalProposalPK.class)
@ToString
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class LocalProposal implements Serializable {

    @Id
    @ManyToOne
    @JoinColumn(name = "populated_point_id")
    @JsonView(value = JsonRules.MobileProposal.class)
    private PopulatedPoint populatedPoint;

    @Id
    @ManyToOne
    @JoinColumn(name = "proposal_id")
    @JsonView(value = JsonRules.MobileProposal.class)
    private Proposal proposal;

    @JsonIgnore
    @OneToMany(mappedBy = "localProposal", cascade = CascadeType.ALL)
    private List<LocalProposalUser> localProposalUsers;

    @JsonView(value = JsonRules.MobileProposal.class)
    private BigDecimal price;

    @JsonView(value = JsonRules.MobileProposal.class)
    private Boolean isActive;

}
