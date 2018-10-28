package com.stanislav.danylenko.course.web.model.user;

import com.stanislav.danylenko.course.db.entity.location.PopulatedPoint;
import com.stanislav.danylenko.course.db.enumeration.L10n;
import com.stanislav.danylenko.course.db.enumeration.TypeOfUser;
import lombok.*;

import java.io.Serializable;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PUBLIC)
@ToString
public class UserRegistrationModel implements Serializable {

    private String firstName;
    private String lastName;
    private String patronymic;
    private String password;
    private L10n localization;
    private Long defaultPopulatedPointId;
    private String email;
    private TypeOfUser type;

}
