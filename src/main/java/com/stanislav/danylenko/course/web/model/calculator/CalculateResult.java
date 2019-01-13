package com.stanislav.danylenko.course.web.model.calculator;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PUBLIC)
@ToString
public class CalculateResult {

    private String name;
    private Double distance;

}
