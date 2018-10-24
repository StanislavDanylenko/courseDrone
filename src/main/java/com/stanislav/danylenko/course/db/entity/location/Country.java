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
public class Country extends BaseEntity {

    private String name;

    @OneToMany(mappedBy = "country",
                 cascade = CascadeType.REFRESH)
    private List<Region> regions;
}
