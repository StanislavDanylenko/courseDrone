package com.stanislav.danylenko.course.db.entity;

import com.stanislav.danylenko.course.db.enumeration.TypeOfSensor;
import lombok.*;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PUBLIC)
public class Sensor extends BaseEntity{

    private String name;
    private TypeOfSensor type;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "drone_id")
    private Drone drone;

}
