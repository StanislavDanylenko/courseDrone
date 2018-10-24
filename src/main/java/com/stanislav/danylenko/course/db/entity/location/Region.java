package com.stanislav.danylenko.course.db.entity.location;

import com.stanislav.danylenko.course.db.entity.BaseEntity;
import lombok.*;

import javax.persistence.*;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PUBLIC)
public class Region extends BaseEntity {

    private String name;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "country_id")
    private Country country;

    @OneToMany(mappedBy = "region",
            cascade = CascadeType.REFRESH)
    private List<PopulatedPoint> populatedPoints;

}
