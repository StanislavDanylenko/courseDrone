package com.stanislav.danylenko.course.db.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.stanislav.danylenko.course.db.entity.location.PopulatedPoint;
import com.stanislav.danylenko.course.db.enumeration.L10n;
import com.stanislav.danylenko.course.db.enumeration.TypeOfUser;
import com.stanislav.danylenko.course.db.enumeration.RoleUser;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import javax.validation.constraints.Email;
import java.time.LocalDateTime;
import java.util.Collection;
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
public class User extends BaseEntity implements UserDetails {

    private String firstName;
    private String lastName;
    private String patronymic;
    @JsonIgnore
    private boolean isActive;
    @JsonIgnore
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

    @ElementCollection(targetClass = RoleUser.class, fetch = FetchType.EAGER)
    @Enumerated
    @CollectionTable(name = "user_role")
    @Column(name = "role_id")
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

    @JsonIgnore
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return getRoles();
    }

    @JsonIgnore
    @Override
    public String getUsername() {
        return email;
    }

    @JsonIgnore
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @JsonIgnore
    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @JsonIgnore
    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @JsonIgnore
    @Override
    public boolean isEnabled() {
        return isActive;
    }
}