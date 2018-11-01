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
import java.util.Map;

@Service
public class GeoService {

    public static double[] getCurrentCoordinates() {
        return new double[]{50.000, 45.000};
    }

    public static double[] getTargetCoordinates() {
        return new double[]{100.000, 105.000};
    }

    public static Map<Double, Double> getCheckPoints() {
        Map<Double, Double> coordinates = new HashMap<>();
        coordinates.put(52.2134, 57.212);
        coordinates.put(59.2454, 66.712);
        coordinates.put(70.26734, 88.278);
        coordinates.put(83.28934, 100.7676);
        coordinates.put(99.54, 103.267);
        return coordinates;
    }

}
