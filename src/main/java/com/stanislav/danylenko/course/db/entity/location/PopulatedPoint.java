package com.stanislav.danylenko.course.db.entity.location;

import com.stanislav.danylenko.course.db.entity.BaseEntity;
import com.stanislav.danylenko.course.db.entity.LocalProposal;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PUBLIC)
public class PopulatedPoint extends BaseEntity {

    @Column(nullable = false)
    private String name;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "region_id")
    private Region region;

    @OneToMany(mappedBy = "populatedPoint", cascade = CascadeType.ALL)
    private List<LocalProposal> proposalList = new ArrayList<>();

    @Override
    public String toString() {
        return "PopulatedPoint{" +
                "name='" + name + '\'' +
                ", region=" + region.getName() +
                ", proposalList=" + proposalList +
                '}';
    }
}
