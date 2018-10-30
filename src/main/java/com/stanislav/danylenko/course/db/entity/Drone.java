package com.stanislav.danylenko.course.db.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PUBLIC)
@RequiredArgsConstructor
@ToString
public class Drone extends BaseEntity {

    @Column(nullable = false)
    @NonNull
    private String name;

    private int batteryLevel;
    private boolean isAvailable = true;

    @OneToMany(mappedBy = "drone",
            cascade = CascadeType.ALL)
    private List<Sensor> sensors = new ArrayList<>();

    @JsonIgnore
    @ManyToOne
    @JoinColumns({
            @JoinColumn(name="LOC_POINT", referencedColumnName="populated_point_id"),
            @JoinColumn(name="LOC_PROP", referencedColumnName="proposal_id")
    })
    private LocalProposal localProposal;

    public boolean addSensor(Sensor sensor) {
        sensor.setDrone(this);
        return sensors.add(sensor);
    }

    public boolean removeSensor(Sensor sensor) {
        if (sensors.contains(sensor)) {
            sensors.remove(sensor);
            return true;
        }
        return false;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Drone drone = (Drone) o;
        return Objects.equals(name, drone.name);
    }

    @Override
    public int hashCode() {

        return Objects.hash(name);
    }
}
