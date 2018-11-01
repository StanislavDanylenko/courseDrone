package com.stanislav.danylenko.course.web.model.user;

import com.stanislav.danylenko.course.db.enumeration.Localization;
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
    private Localization localization;
    private Long defaultPopulatedPointId;
    private String email;
    private TypeOfUser type;

}
