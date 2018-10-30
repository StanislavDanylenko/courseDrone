package com.stanislav.danylenko.course.service;

import com.stanislav.danylenko.course.db.entity.Drone;
import com.stanislav.danylenko.course.db.entity.Sensor;
import com.stanislav.danylenko.course.db.entity.location.PopulatedPoint;
import com.stanislav.danylenko.course.db.repository.DroneRepository;
import com.stanislav.danylenko.course.service.location.PopulatedPointService;
import com.stanislav.danylenko.course.web.model.DroneModel;
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

        PopulatedPoint populatedPoint = populatedPointService.find(model.getPopulatedPointId());
        drone.setPopulatedPoint(populatedPoint);
        drone.setAvailable(model.isAvailable());
        drone.setBatteryLevel(model.getBatteryLevel());

        Set<Sensor> sensorsOld = new HashSet<>(drone.getSensors());
        Set<Sensor> sensorOldCopy = new HashSet<>(sensorsOld);
        Set<Sensor> sensorNew = new HashSet<>(model.getSensors());

        sensorsOld.retainAll(sensorNew);
        sensorsOld.addAll(sensorNew);
        sensorOldCopy.removeAll(sensorsOld);

        for (Sensor sensor : sensorsOld) {
            sensor.setDrone(drone);
        }

        List<Sensor> updatedSensors = new ArrayList<>();
        updatedSensors.addAll(sensorsOld);
        drone.setSensors(updatedSensors);

        return new ArrayList<>(sensorOldCopy);
    }

    public Drone processDrone(DroneModel model) {
        Drone drone = new Drone();
        drone.setAvailable(true);
        drone.setBatteryLevel(model.getBatteryLevel());
        drone.setName(model.getName());

        PopulatedPoint populatedPoint = populatedPointService.find(model.getPopulatedPointId());
        drone.setPopulatedPoint(populatedPoint);

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
