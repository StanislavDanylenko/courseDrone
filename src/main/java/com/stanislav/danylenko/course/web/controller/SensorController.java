package com.stanislav.danylenko.course.web.controller;

import com.stanislav.danylenko.course.db.entity.Drone;
import com.stanislav.danylenko.course.db.entity.Sensor;
import com.stanislav.danylenko.course.exception.DBException;
import com.stanislav.danylenko.course.service.DroneService;
import com.stanislav.danylenko.course.service.SensorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.util.List;

@RestController
@PreAuthorize("hasAuthority('ADMIN')")
@RequestMapping("/sensors")
public class SensorController {

    @Autowired
    private SensorService service;
    @Autowired
    private DroneService droneService;

    @GetMapping
    public @ResponseBody
    ResponseEntity<Iterable<Sensor>> getSensors() throws DBException {
        return ResponseEntity.ok(service.findAll());
    }

    @GetMapping("/{id}")
    public @ResponseBody
    ResponseEntity<Sensor> getSensor(@PathVariable Long id) throws DBException {
        return new ResponseEntity<>(service.find(id), HttpStatus.OK);
    }

    @PostMapping
    public @ResponseBody
    ResponseEntity<Sensor> createSensor(@RequestBody Sensor sensor) throws DBException {
        service.save(sensor);
        return new ResponseEntity<>(sensor, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public @ResponseBody
    ResponseEntity<Sensor> updateSensor(@RequestBody Sensor newSensor, @PathVariable Long id) throws DBException {
        Sensor sensor = service.find(id);
        service.updateSensor(sensor, newSensor);
        service.update(sensor);
        return ResponseEntity.ok(sensor);
    }

    @DeleteMapping("/{id}")
    public void deleteSensor(@PathVariable Long id, HttpServletResponse response) throws DBException {
        service.delete(id);
        response.setStatus(HttpServletResponse.SC_OK);
    }

    @GetMapping("/drone/{id}")
    public @ResponseBody
    ResponseEntity<List<Sensor>> getSensorByDrone(@PathVariable Long id) throws DBException {
        Drone drone = droneService.find(id);
        List<Sensor> sensorList = drone.getSensors();
        return new ResponseEntity<>(sensorList, HttpStatus.OK);
    }

}
