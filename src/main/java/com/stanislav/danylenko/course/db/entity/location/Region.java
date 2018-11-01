package com.stanislav.danylenko.course.db.entity.location;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonView;
import com.stanislav.danylenko.course.db.entity.BaseEntity;
import com.stanislav.danylenko.course.JsonRules;
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
public class Region extends BaseEntity {

    @Column(nullable = false)
    @NonNull
    @JsonView(value = JsonRules.PartialLocation.class)
    private String name;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "country_id")
    private Country country;

    @OneToMany(mappedBy = "region",
            cascade = CascadeType.ALL)
    private List<PopulatedPoint> populatedPoints = new ArrayList<>();

    @Override
    public String toString() {
        return "Region{" +
                "name='" + name + '\'' +
                ", country=" + country.getName() +
                ", populatedPoints=" + populatedPoints +
                '}';
    }

    public boolean addPopulatedPoint(PopulatedPoint point) {
        point.setRegion(this);
        return populatedPoints.add(point);
    }

    public boolean removePopulatedPoint(PopulatedPoint region) {
        if (populatedPoints.contains(region)) {
            populatedPoints.remove(region);
            return true;
        }
        return false;
    }
}
