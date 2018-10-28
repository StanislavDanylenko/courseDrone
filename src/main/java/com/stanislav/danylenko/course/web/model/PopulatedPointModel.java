package com.stanislav.danylenko.course.web.model;

import lombok.*;

import java.io.Serializable;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PUBLIC)
@ToString
public class PopulatedPointModel implements Serializable {

    private Long id;
    private String name;
    private Long regionId;

}
