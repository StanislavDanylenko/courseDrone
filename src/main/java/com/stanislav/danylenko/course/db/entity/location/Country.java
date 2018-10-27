package com.stanislav.danylenko.course.db.entity.location;

import com.stanislav.danylenko.course.db.entity.BaseEntity;
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
public class Country extends BaseEntity {

    @Column(unique = true, nullable = false)
    private String name;

    @OneToMany(mappedBy = "country",
                 cascade = CascadeType.ALL)
    private List<Region> regions = new ArrayList<>();

    @Override
    public String toString() {
        return "Country{" +
                "name='" + name + '\'' +
                ", regions=" + regions +
                '}';
    }
}
