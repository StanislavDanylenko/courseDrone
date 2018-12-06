package com.stanislav.danylenko.course.web.model;

import com.stanislav.danylenko.course.db.entity.Sensor;
import com.stanislav.danylenko.course.db.enumeration.OperationStatus;
import lombok.*;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PUBLIC)
@ToString
public class DroneTaskModel {

    private UUID uuid;
    private OperationStatus status;
    private Double[] targetLocation;
    private Double[] startLocation;
    private Double[] currentLocation;
    private Map<Double, Double> checkPoints;

}
