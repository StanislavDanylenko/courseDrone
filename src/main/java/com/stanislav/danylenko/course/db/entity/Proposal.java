package com.stanislav.danylenko.course.db.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.stanislav.danylenko.course.db.enumeration.TypeOfSensor;
import lombok.*;

import javax.persistence.*;
import java.util.List;
import java.util.Set;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PUBLIC)
@RequiredArgsConstructor
@ToString
public class Proposal extends BaseEntity {

    @Column(nullable = false, unique = true)
    @NonNull
    private String name;

    @Column(nullable = false)
    @NonNull
    private String description;

    @JsonIgnore
    @OneToMany(mappedBy = "proposal", cascade = CascadeType.ALL)
    private List<LocalProposal> localProposals;

    @ElementCollection(targetClass = TypeOfSensor.class)
    @Enumerated
    private Set<TypeOfSensor> sensors;

}
