package com.stanislav.danylenko.course.db.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonView;
import com.stanislav.danylenko.course.JsonRules;
import com.stanislav.danylenko.course.db.entity.bl.Report;
import com.stanislav.danylenko.course.db.entity.pk.LocalProposalUserPK;
import com.stanislav.danylenko.course.db.enumeration.OperationStatus;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PUBLIC)
@ToString
@IdClass(LocalProposalUserPK.class)
public class LocalProposalUser implements Serializable {

    @Id
    @ManyToOne
    @JoinColumns({
            @JoinColumn(name = "LOC_POINT", referencedColumnName = "populated_point_id"),
            @JoinColumn(name = "LOC_PROP", referencedColumnName = "proposal_id")
    })
    @JsonView(value = JsonRules.MobileProposal.class)
    private LocalProposal localProposal;

    @Id
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Enumerated
    @JsonView(value = JsonRules.MobileProposal.class)
    private OperationStatus status;

    @Id
    @Column(updatable = false, nullable = false, unique = true, columnDefinition = "BINARY(16)")
    @JsonView(value = JsonRules.MobileProposal.class)
    private UUID uuid;

    @JsonView(value = JsonRules.MobileProposal.class)
    private Long droneId;
    @JsonView(value = JsonRules.MobileProposal.class)
    private Report report;
    @JsonView(value = JsonRules.MobileProposal.class)
    private Double[] targetCoordinates;
    @JsonView(value = JsonRules.MobileProposal.class)
    private BigDecimal price;

    @Column
    @CreationTimestamp
    /*@JsonIgnore*/
    private LocalDateTime createDateTime;

    @Column
    @UpdateTimestamp
   /* @JsonIgnore*/
    private LocalDateTime updateDateTime;

}
