package com.stanislav.danylenko.course.db.entity.location;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonView;
import com.stanislav.danylenko.course.db.entity.BaseEntity;
import com.stanislav.danylenko.course.JsonRules;
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
@RequiredArgsConstructor
public class PopulatedPoint extends BaseEntity {

    @Column(nullable = false)
    @NonNull
    @JsonView(value = JsonRules.PartialLocation.class)
    private String name;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "region_id")
    private Region region;

    @JsonIgnore
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
