package com.stanislav.danylenko.course.service;

import com.stanislav.danylenko.course.db.entity.location.PopulatedPoint;
import org.apache.http.HttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpUriRequest;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.util.EntityUtils;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;

@Service
public class GeoService {

    public static Map<Double, Double> getCheckPoints(Double[] start, Double[] finish) {

        double distanceX = finish[0] - start[0];
        double distanceY = finish[1] - start[1];

        double pointX = distanceX / 5;
        double pointY = distanceY / 5;

        Map<Double, Double> coordinates = new LinkedHashMap<>();

        for (int i = 1; i <= 5; i++) {
            coordinates.put(start[0] + pointX * i, start[1] + pointY * i);
        }

        return coordinates;
    }

}
