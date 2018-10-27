package com.stanislav.danylenko.course.db.entity;

import com.stanislav.danylenko.course.db.entity.bl.Report;
import com.stanislav.danylenko.course.db.entity.pk.ProposalUserPK;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.io.Serializable;
import java.sql.Date;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@IdClass(ProposalUserPK.class)
@ToString
public class ProposalUser implements Serializable {

    @Id
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Id
    @ManyToOne
    @JoinColumn(name = "proposal_id")
    private Proposal proposal;

    @Column
    @CreationTimestamp
    private LocalDateTime createDateTime;

    @Column
    @UpdateTimestamp
    private LocalDateTime updateDateTime;

    private Report report;

}
