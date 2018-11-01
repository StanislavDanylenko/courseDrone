package com.stanislav.danylenko.course.service;

import com.stanislav.danylenko.course.db.entity.Sensor;
import com.stanislav.danylenko.course.db.repository.SensorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SensorService implements GenericService<Sensor> {

    @Autowired
    private SensorRepository repository;

    @Override
    public Sensor save(Sensor sensor) {
        return repository.save(sensor);
    }

    @Override
    public void delete(Sensor sensor) {
        repository.delete(sensor);
    }

    @Override
    public Sensor update(Sensor sensor) {
        return repository.save(sensor);
    }

    @Override
    public Sensor find(Long id) {
        return repository.findById(id).orElse(null);
    }

    @Override
    public Iterable<Sensor> findAll() {
        return repository.findAll();
    }

    @Override
    public void delete(Long id) {
        repository.deleteById(id);
    }

    public void deleteAll(Iterable<Sensor> collection) {
        repository.deleteAll(collection);
    }

    public void updateSensor(Sensor sensor, Sensor newSensor) {
        sensor.setValue(newSensor.getValue());
    }
}
