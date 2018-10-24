package com.stanislav.danylenko.course.db.entity;

import lombok.*;

import javax.persistence.*;
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
    private List<ProposalCall> users;

    @OneToMany(mappedBy = "proposal", cascade = CascadeType.REFRESH)
    private List<LocalPropose> localProposes;

}
