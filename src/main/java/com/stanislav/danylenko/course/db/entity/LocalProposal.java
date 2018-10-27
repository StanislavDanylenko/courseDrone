package com.stanislav.danylenko.course.db.entity;

import com.stanislav.danylenko.course.db.entity.location.PopulatedPoint;
import com.stanislav.danylenko.course.db.entity.pk.LocalProposalPK;
import lombok.*;

import javax.persistence.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PUBLIC)
@IdClass(LocalProposalPK.class)
@ToString
public class LocalProposal implements Serializable {

    @Id
    @ManyToOne
    @JoinColumn(name = "populated_point_id")
    private PopulatedPoint populatedPoint;

    @Id
    @ManyToOne
    @JoinColumn(name = "proposal_id")
    private Proposal proposal;


    @OneToMany(mappedBy = "localProposal",
            cascade = CascadeType.REFRESH)
    private List<Drone> drones = new ArrayList<>();

   /* @ManyToMany(mappedBy = "proposals")
    private List<User> users;*/

    @OneToMany(mappedBy = "localProposal")
    private List<LocalProposalUser> localProposalUsers;

    public boolean addDrone(Drone drone) {
        drone.setLocalProposal(this);
        return drones.add(drone);
    }

}
