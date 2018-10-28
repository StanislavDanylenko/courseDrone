package com.stanislav.danylenko.course.db.entity;

import com.stanislav.danylenko.course.db.enumeration.L10n;
import com.stanislav.danylenko.course.db.enumeration.TypeOfUser;
import com.stanislav.danylenko.course.db.enumeration.RoleUser;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PUBLIC)
@RequiredArgsConstructor
@ToString
public class User extends BaseEntity {

    private String firstName;
    private String lastName;
    private String patronymic;
    private boolean isActive;
    private String password;
    private L10n localization;

    @Column(nullable = false, unique = true)
    @NonNull
    private String email;

    @Enumerated(EnumType.STRING)
    private TypeOfUser type;

    @Column
    @CreationTimestamp
    private LocalDateTime createDateTime;

    @Column
    @UpdateTimestamp
    private LocalDateTime updateDateTime;

    @ElementCollection(targetClass = RoleUser.class)
    @Enumerated
    @CollectionTable(name = "user_role")
    @Column(name = "role_id")
    private Set<RoleUser> roles = new HashSet<>();

    /*@ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(name = "localPropose_user",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = {
                    @JoinColumn(name = "LOC_POINT", referencedColumnName = "populated_point_id"),
                    @JoinColumn(name = "LOC_PROP", referencedColumnName = "proposal_id")
            }
    )
    private List<LocalProposal> proposals = new ArrayList<>();*/

    @OneToMany(mappedBy = "user")
    List<LocalProposalUser> localProposalUsers;

    public boolean addRole(RoleUser role) {
        return roles.add(role);
    }

    public boolean removeRole(RoleUser role) {
        if (roles.contains(role)) {
            roles.remove(role);
            return true;
        }
        return false;
    }

}