package com.stanislav.danylenko.course.db.entity;

import lombok.*;

import javax.persistence.*;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PUBLIC)
public class Drone extends BaseEntity {

    private String name;

    @OneToMany(mappedBy = "drone",
            cascade = CascadeType.REFRESH)
    private List<Sensor> sensors;


    @ManyToOne
    @JoinColumns({
            @JoinColumn(name="LOC_POINT", referencedColumnName="populated_point_id"),
            @JoinColumn(name="LOC_PROP", referencedColumnName="proposal_id")
    })
    private LocalProposal localProposal;

}
