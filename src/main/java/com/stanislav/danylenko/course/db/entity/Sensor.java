package com.stanislav.danylenko.course.db.entity;

import com.stanislav.danylenko.course.db.enumeration.TypeOfSensor;
import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PUBLIC)
@RequiredArgsConstructor
public class Sensor extends BaseEntity {

    @Column(nullable = false)
    @NonNull
    private String name;

    private double value;

    @Column(nullable = false)
    @NonNull
    private TypeOfSensor type;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "drone_id")
    private Drone drone;

    @Override
    public String toString() {
        return "Sensor{" +
                "name='" + name + '\'' +
                ", type=" + type +
                ", drone=" + drone.getName() +
                '}';
    }
}
