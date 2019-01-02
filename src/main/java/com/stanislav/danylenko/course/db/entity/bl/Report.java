package com.stanislav.danylenko.course.db.entity.bl;

import com.fasterxml.jackson.annotation.JsonView;
import com.stanislav.danylenko.course.JsonRules;
import lombok.*;

import java.io.Serializable;
import java.sql.Date;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PUBLIC)
@ToString
@JsonView(value = JsonRules.MobileProposal.class)
public class Report implements Serializable {

    private double humidity = -9999;
    private double radiation = -9999;
    private double pressure = -9999;
    private double airPollution = -9999;
    private double temperature = -9999;
    private List<byte[]> photo;
    private String description;


}
