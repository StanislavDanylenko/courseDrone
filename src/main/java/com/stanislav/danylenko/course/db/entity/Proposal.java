package com.stanislav.danylenko.course.db.entity;

import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PUBLIC)
public class Proposal extends BaseEntity {

    private String name;
    private String description;

    @OneToMany(mappedBy = "proposal", cascade = CascadeType.REFRESH)
    private List<ProposalUser> users = new ArrayList<>();

    @OneToMany(mappedBy = "proposal", cascade = CascadeType.REFRESH)
    private List<LocalProposal> localProposals = new ArrayList<>();

}
