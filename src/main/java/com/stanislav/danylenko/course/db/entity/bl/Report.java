package com.stanislav.danylenko.course.db.entity.bl;

import lombok.*;

import java.io.Serializable;
import java.sql.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PUBLIC)
@ToString
public class Report implements Serializable {

    private Date dateOfCreating;
    // todo write all available sensors

}
