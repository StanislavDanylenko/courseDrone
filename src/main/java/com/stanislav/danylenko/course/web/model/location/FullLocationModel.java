package com.stanislav.danylenko.course.web.model.location;

import com.stanislav.danylenko.course.db.entity.location.Country;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PUBLIC)
@ToString
public class FullLocationModel {

    private Long pointId;
    private String pointName;

    private Long regionId;
    private String regionName;

    private Long countryId;
    private String countryName;

    private List<Country> totalList = new ArrayList<>();

}
