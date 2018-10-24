package com.stanislav.danylenko.course.db.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PUBLIC)
public class Role extends BaseEntity {

    @Column
    private String name;

}
