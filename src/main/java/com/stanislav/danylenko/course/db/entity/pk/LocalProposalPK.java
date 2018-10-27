package com.stanislav.danylenko.course.db.entity.pk;

import lombok.*;

import javax.persistence.Embeddable;
import java.io.Serializable;

@Embeddable
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@EqualsAndHashCode
public class LocalProposalPK implements Serializable {

    private Long populatedPoint;
    private Long proposal;

}
