package com.stanislav.danylenko.course.db.entity.pk;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Embeddable;
import java.io.Serializable;

@Embeddable
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class LocalProposalPK implements Serializable {

    private Long populatedPoint;
    private Long proposal;

}
