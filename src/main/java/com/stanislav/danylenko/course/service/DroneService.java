package com.stanislav.danylenko.course.service;

import com.stanislav.danylenko.course.db.entity.Drone;
import com.stanislav.danylenko.course.db.entity.Sensor;
import com.stanislav.danylenko.course.db.entity.location.PopulatedPoint;
import com.stanislav.danylenko.course.db.repository.DroneRepository;
import com.stanislav.danylenko.course.service.location.PopulatedPointService;
import com.stanislav.danylenko.course.web.model.DroneModel;
import com.stanislav.danylenko.course.web.model.ReportModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class DroneService implements GenericService<Drone> {

    @Autowired
    private DroneRepository repository;

    @Autowired
    private PopulatedPointService populatedPointService;

    @Override
    public Drone save(Drone drone) {
        return repository.save(drone);
    }

    @Override
    public void delete(Drone drone) {
        repository.delete(drone);
    }

    @Override
    public Drone update(Drone drone) {
        return repository.save(drone);
    }

    @Override
    public Drone find(Long id) {
        return repository.findById(id).orElse(null);
    }

    public Drone findByMAC(String MAC) {
        return repository.findByMac(MAC);
    }

    @Override
    public Iterable<Drone> findAll() {
        return repository.findAll();
    }

    @Override
    public void delete(Long id) {
        repository.deleteById(id);
    }

    public Iterable<Drone> findByPopulatedPoint(Long id) {
        return repository.findAllByPopulatedPointId(id);
    }

    public List<Sensor> updateDrone(Drone drone, DroneModel model) {

        if (model.getPopulatedPointId() != null) {
            PopulatedPoint populatedPoint = populatedPointService.find(model.getPopulatedPointId());
            drone.setPopulatedPoint(populatedPoint);
            drone.setCurrentLocation(new Double[] {populatedPoint.getLatitude(), populatedPoint.getLongitude()});
        }

        if (model.getIsAvailable() != null) {
            drone.setIsAvailable(model.getIsAvailable());
        }

        if (model.getBatteryLevel() != null) {
            drone.setBatteryLevel(model.getBatteryLevel());
            if (drone.getBatteryLevel() < 70) {
                drone.setIsAvailable(false);
            } else {
                drone.setIsAvailable(true);
            }
        }
        if (model.getCurrentCoordinates() != null) {
            drone.setCurrentLocation(model.getCurrentCoordinates());
        }

        Set<Sensor> sensorsOldCopy = new HashSet<>();

        if (model.getSensors() != null) {

            Set<Sensor> sensorsOld = new HashSet<>(drone.getSensors());
            sensorsOldCopy = new HashSet<>(sensorsOld);
            Set<Sensor> sensorNew = new HashSet<>(model.getSensors());

            sensorsOld.retainAll(sensorNew);
            sensorsOld.addAll(sensorNew);
            sensorsOldCopy.removeAll(sensorsOld);

            for (Sensor sensor : sensorsOld) {
                sensor.setDrone(drone);
            }

            List<Sensor> updatedSensors = new ArrayList<>();
            updatedSensors.addAll(sensorsOld);
            drone.setSensors(updatedSensors);
        }

        return new ArrayList<>(sensorsOldCopy);
    }

    public Drone createFromModel(DroneModel model) {

        Drone drone = new Drone();
        drone.setIsAvailable(true);
        drone.setBatteryLevel(model.getBatteryLevel());
        drone.setName(model.getName());
        //drone.setCurrentLocation(model.getCurrentCoordinates());
        drone.setMac(model.getMac());

        PopulatedPoint populatedPoint = populatedPointService.find(model.getPopulatedPointId());
        drone.setPopulatedPoint(populatedPoint);

        drone.setCurrentLocation(new Double[] {populatedPoint.getLatitude(), populatedPoint.getLongitude()});

        List<Sensor> sensors = model.getSensors();
        if (!sensors.isEmpty()) {
            for (Sensor sensor : sensors) {
                sensor.setDrone(drone);
            }
        }
        drone.setSensors(sensors);
        return drone;
    }
}
