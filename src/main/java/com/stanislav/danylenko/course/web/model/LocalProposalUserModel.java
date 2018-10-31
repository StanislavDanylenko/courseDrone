package com.stanislav.danylenko.course.web.model;

import lombok.*;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PUBLIC)
@ToString
public class LocalProposalUserModel {

    private Long userId;
    private Long populatedPointId;
    private Long proposalId;
    private double[] targetCoordinated;

}
