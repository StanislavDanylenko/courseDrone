package com.stanislav.danylenko.course.web.model.calculator;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PUBLIC)
@ToString
public class Coordinates {

    private Long id;
    private Double latitude;
    private Double longitude;

}
