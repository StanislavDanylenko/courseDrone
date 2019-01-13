package com.stanislav.danylenko.course.service.calculator;

import com.stanislav.danylenko.course.db.entity.location.PopulatedPoint;
import com.stanislav.danylenko.course.service.location.PopulatedPointService;
import com.stanislav.danylenko.course.web.model.calculator.CalculateResult;
import com.stanislav.danylenko.course.web.model.calculator.Coordinates;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CalculatorService {

    public static final Double DELAY_COEFFICIENT = 1.1d;
    @Autowired
    private PopulatedPointService populatedPointService;

    private List<Coordinates> points = new ArrayList<>();

    public CalculateResult calculate(Double latitude, Double longitude) {

        fillList();
        return findNearestPoint(latitude, longitude);
    }

    private void fillList() {
        Iterable<PopulatedPoint> populatedPoints = populatedPointService.findAll();
        for (PopulatedPoint point : populatedPoints) {
            points.add(new Coordinates(point.getId(), point.getLatitude(), point.getLongitude()));
        }
    }

    private CalculateResult findNearestPoint(Double latitude, Double longitude) {
        double minDistance = Double.MAX_VALUE;
        long id = 0;
        for (Coordinates coordinates : points) {
            double distance = Math.sqrt(
                            (coordinates.getLatitude() - latitude) * (coordinates.getLatitude() - latitude)
                            + (coordinates.getLongitude() - longitude) * (coordinates.getLongitude() - longitude)
            );
            if (distance < minDistance) {
                id = coordinates.getId();
                minDistance = distance;
            }
        }
        PopulatedPoint point = populatedPointService.find(id);
        return new CalculateResult(point.getName(), round(minDistance * DELAY_COEFFICIENT, 2));
    }

    public static double round(double value, int places) {
        if (places < 0) throw new IllegalArgumentException();

        long factor = (long) Math.pow(10, places);
        value = value * factor;
        long tmp = Math.round(value);
        return (double) tmp / factor;
    }

}
