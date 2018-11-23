package com.stanislav.danylenko.course.db.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonView;
import com.stanislav.danylenko.course.JsonRules;
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
public class Drone extends BaseEntity implements Comparable<Drone> {

    // todo add MAC-adress for drone

    @Column(nullable = false)
    @NonNull
    @JsonView(value = JsonRules.DroneCustom.class)
    private String name;

    @Column(columnDefinition = "BINARY(16)")
    @JsonView(value = JsonRules.DroneCustom.class)
    private UUID currentUuid;

    @JsonView(value = JsonRules.DroneCustom.class)
    private Integer batteryLevel;

    @JsonView(value = JsonRules.DroneCustom.class)
    private Boolean isAvailable = true;

    @JsonView(value = JsonRules.DroneCustom.class)
    private Double[] currentLocation;

    @JsonView(value = JsonRules.DroneCustom.class)
    @OneToMany(mappedBy = "drone",
            cascade = CascadeType.ALL)
    private List<Sensor> sensors = new ArrayList<>();

    @JsonView(value = JsonRules.DroneCustom.class)
    @ManyToOne
    @JoinColumn(name = "populated_point_id")
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

    @Override
    public int compareTo(Drone o) {
        return o.getBatteryLevel() - this.getBatteryLevel();
    }
}
