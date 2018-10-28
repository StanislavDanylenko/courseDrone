package com.stanislav.danylenko.course.db.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.stanislav.danylenko.course.db.entity.location.PopulatedPoint;
import com.stanislav.danylenko.course.db.enumeration.L10n;
import com.stanislav.danylenko.course.db.enumeration.TypeOfUser;
import com.stanislav.danylenko.course.db.enumeration.RoleUser;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import javax.validation.constraints.Email;
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
    @JsonIgnore
    private boolean isActive;
    private String password;
    private PopulatedPoint defaultPopulatedPoint;

    @Column(nullable = false, unique = true)
    @NonNull
    @Email
    @JsonIgnore
    private String email;

    @Enumerated
    private L10n localization;

    @Enumerated
    private TypeOfUser type;

    @Column
    @CreationTimestamp
    @JsonIgnore
    private LocalDateTime createDateTime;

    @Column
    @UpdateTimestamp
    @JsonIgnore
    private LocalDateTime updateDateTime;

    @ElementCollection(targetClass = RoleUser.class)
    @Enumerated
    @CollectionTable(name = "user_role")
    @Column(name = "role_id")
    @JsonIgnore
    private Set<RoleUser> roles = new HashSet<>();

    @OneToMany(mappedBy = "user")
    @JsonIgnore
    private List<LocalProposalUser> localProposalUsers;

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