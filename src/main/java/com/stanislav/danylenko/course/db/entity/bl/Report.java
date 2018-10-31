package com.stanislav.danylenko.course.db.entity.bl;

import lombok.*;

import java.io.Serializable;
import java.sql.Date;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PUBLIC)
@ToString
public class Report implements Serializable {

    private double humidity;
    private double radiation;
    private double pressure;
    private double airPollution;
    private double temperature;
    private List<byte[]> photo;

}
