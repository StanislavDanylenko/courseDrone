package com.stanislav.danylenko.course.db.entity;

import com.stanislav.danylenko.course.db.enumeration.TypeOfUser;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PUBLIC)
public class User extends BaseEntity {

    private String firstName;
    private String lastName;
    private String patronymic;

    private String email;

    @Enumerated(EnumType.STRING)
    private TypeOfUser type;

    @Column
    @CreationTimestamp
    private LocalDateTime createDateTime;

    @Column
    @UpdateTimestamp
    private LocalDateTime updateDateTime;

    @ElementCollection(targetClass = Role.class)
    @Enumerated(EnumType.STRING)
    @CollectionTable(name = "user_role")
    @Column(name = "roles")
    private Set<Role> roles;

    @OneToMany(mappedBy = "user", cascade = CascadeType.REFRESH)
    private List<ProposalUser> proposals;

}