package com.stanislav.danylenko.course.db.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.stanislav.danylenko.course.db.entity.location.PopulatedPoint;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.UUID;

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
    @Column(columnDefinition = "BINARY(16)")
    private UUID currentUuid;

    @OneToMany(mappedBy = "drone",
            cascade = CascadeType.ALL)
    private List<Sensor> sensors = new ArrayList<>();

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name="populated_point_id")
    private PopulatedPoint populatedPoint;

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
