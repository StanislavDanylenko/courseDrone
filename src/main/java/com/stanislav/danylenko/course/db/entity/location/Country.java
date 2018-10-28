package com.stanislav.danylenko.course.db.entity.location;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonView;
import com.stanislav.danylenko.course.db.entity.BaseEntity;
import com.stanislav.danylenko.course.db.entity.JsonRules;
import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PUBLIC)
@RequiredArgsConstructor
public class Country extends BaseEntity {

    @Column(unique = true, nullable = false)
    @NonNull
    @JsonView(value = JsonRules.PartialLocation.class)
    private String name;

    /*@JsonIgnore*/
    @OneToMany(mappedBy = "country",
            cascade = CascadeType.ALL)
    @Setter(AccessLevel.NONE)
    private List<Region> regions = new ArrayList<>();

    @Override
    public String toString() {
        return "Country{" +
                "name='" + name + '\'' +
                ", regions=" + regions +
                '}';
    }

    public boolean addRegion(Region region) {
        region.setCountry(this);
       return regions.add(region);
    }

    public boolean removeRegion(Region region) {
        if (regions.contains(region)) {
            regions.remove(region);
            return true;
        }
        return false;
    }

}
