package com.stanislav.danylenko.course.web.model;

import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PUBLIC)
@ToString
public class StatisticModel {

    private List<String> proposals = new ArrayList<>();
    private List<Integer> popularitys = new ArrayList<>();

    public void addProposal(String proposal) {
        proposals.add(proposal);
    }

    public void addPopularity(Integer popularity) {
        popularitys.add(popularity);
    }

}
