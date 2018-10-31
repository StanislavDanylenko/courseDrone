package com.stanislav.danylenko.course.web.model;

import com.stanislav.danylenko.course.db.entity.Drone;
import com.stanislav.danylenko.course.db.entity.Sensor;
import com.stanislav.danylenko.course.db.entity.bl.Report;
import com.stanislav.danylenko.course.db.enumeration.OperationStatus;
import lombok.*;

import javax.persistence.Enumerated;
import java.io.Serializable;
import java.util.List;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PUBLIC)
@ToString
public class ReportModel {

    private UUID uuid;
    private OperationStatus status;
    private List<Sensor> sensors;
    // private coordinates of target location. type? format? todo add
    // coordinates of start locaation
    // private current location

}
