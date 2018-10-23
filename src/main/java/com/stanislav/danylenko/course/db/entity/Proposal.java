package com.stanislav.danylenko.course.db.entity;

import com.stanislav.danylenko.course.db.enumeration.TypeOfProposal;
import com.stanislav.danylenko.course.db.enumeration.TypeOfUser;
import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PUBLIC)
public class Proposal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String description;

    @Enumerated(EnumType.STRING)
    private TypeOfProposal type;

}
