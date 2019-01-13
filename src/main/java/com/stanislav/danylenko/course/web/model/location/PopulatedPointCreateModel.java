package com.stanislav.danylenko.course.web.model.location;

import lombok.*;

import java.io.Serializable;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PUBLIC)
@ToString
public class PopulatedPointCreateModel implements Serializable {

    private Long id;
    private String name;
    private Long regionId;
    private Double latitude;
    private Double longitude;

}
