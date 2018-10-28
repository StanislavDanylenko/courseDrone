package com.stanislav.danylenko.course.web.model;

import lombok.*;

import java.io.Serializable;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PUBLIC)
@ToString
public class RegionModel implements Serializable {

    private String name;
    private String nameCountry;
    private Long countryId;

}
