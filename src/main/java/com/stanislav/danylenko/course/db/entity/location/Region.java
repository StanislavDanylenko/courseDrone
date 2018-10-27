package com.stanislav.danylenko.course.db.entity.location;

import com.stanislav.danylenko.course.db.entity.BaseEntity;
import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.sql.Delete;

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
    @NonNull private String name;

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
}
