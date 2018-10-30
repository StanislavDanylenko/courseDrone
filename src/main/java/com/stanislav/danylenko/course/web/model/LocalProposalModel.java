package com.stanislav.danylenko.course.web.model;

import com.stanislav.danylenko.course.db.entity.Drone;
import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PUBLIC)
@ToString
public class LocalProposalModel {

    private Long proposalId;
    private Long populatedPointId;

}
