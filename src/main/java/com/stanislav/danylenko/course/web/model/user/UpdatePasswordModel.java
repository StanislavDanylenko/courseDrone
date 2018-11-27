package com.stanislav.danylenko.course.web.model.user;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PUBLIC)
@ToString
public class UpdatePasswordModel {

    private Long id;
    private String oldPassword;
    private String newPassword;

}
