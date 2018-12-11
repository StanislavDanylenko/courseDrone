package com.stanislav.danylenko.course.web.model.mobile;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PUBLIC)
@ToString
public class UserCredentialsModel {

    private String email;
    private String password;

}
