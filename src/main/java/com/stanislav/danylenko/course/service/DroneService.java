package com.stanislav.danylenko.course.service;

import com.stanislav.danylenko.course.db.entity.Drone;
import com.stanislav.danylenko.course.db.entity.Sensor;
import com.stanislav.danylenko.course.db.repository.DroneRepository;
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

    public void updateDrone(Drone drone, Drone newDrone) {
        drone.setLocalProposal(newDrone.getLocalProposal());
        drone.setAvailable(newDrone.isAvailable());
        drone.setBatteryLevel(newDrone.getBatteryLevel());
        Set<Sensor> sensors = new HashSet<>(drone.getSensors());
        sensors.addAll(newDrone.getSensors());
        List<Sensor> updatedSensors = new ArrayList<>(sensors);
        drone.setSensors(updatedSensors);
    }

    public void processDrone(Drone drone) {
        List<Sensor> sensors = drone.getSensors();
        if (!sensors.isEmpty()) {
            for (Sensor sensor : sensors) {
                sensor.setDrone(drone);
            }
        }
    }
}
