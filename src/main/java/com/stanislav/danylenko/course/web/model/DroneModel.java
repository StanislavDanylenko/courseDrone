package com.stanislav.danylenko.course.web.model;

import com.stanislav.danylenko.course.db.entity.Sensor;
import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PUBLIC)
@ToString
public class DroneModel {

    private String name;
    private int batteryLevel;
    private boolean isAvailable;
    private List<Sensor> sensors;
    private Long populatedPointId;
    private double[] currentCoordinates;

}
