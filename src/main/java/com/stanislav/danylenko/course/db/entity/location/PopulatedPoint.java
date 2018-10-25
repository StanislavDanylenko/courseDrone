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

    private String name;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "region_id")
    private Region region;

    @OneToMany(mappedBy = "populatedPoint", cascade = CascadeType.REFRESH)
    private List<LocalProposal> proposalList = new ArrayList<>();

}
