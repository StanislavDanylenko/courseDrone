package com.stanislav.danylenko.course.web.controller;

import com.stanislav.danylenko.course.db.entity.Drone;
import com.stanislav.danylenko.course.db.entity.LocalProposalUser;
import com.stanislav.danylenko.course.db.entity.Sensor;
import com.stanislav.danylenko.course.exception.DBException;
import com.stanislav.danylenko.course.service.DroneService;
import com.stanislav.danylenko.course.service.GeoService;
import com.stanislav.danylenko.course.service.LocalProposalUserService;
import com.stanislav.danylenko.course.service.SensorService;
import com.stanislav.danylenko.course.web.model.DroneModel;
import com.stanislav.danylenko.course.web.model.DroneTaskModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.util.List;
import java.util.UUID;

// todo change if annotation to each method
@RestController
@RequestMapping("admin/drones")
public class DroneController {
    
    @Autowired
    private DroneService service;

    @Autowired
    private SensorService sensorService;

    @Autowired
    private DroneService droneService;

    @Autowired
    private LocalProposalUserService localProposalUserService;

    @GetMapping
    public @ResponseBody
    ResponseEntity<Iterable<Drone>> getDrones() throws DBException {
        return ResponseEntity.ok(service.findAll());
    }

    @GetMapping("/{id}")
    public @ResponseBody
    ResponseEntity<Drone> getDrone(@PathVariable Long id) throws DBException {
        return new ResponseEntity<>(service.find(id), HttpStatus.FOUND);
    }

    @GetMapping("/point/{id}")
    public @ResponseBody
    ResponseEntity<Iterable<Drone>> getDroneByPopulatedPoint(@PathVariable Long id) throws DBException {
        return new ResponseEntity<>(service.findByPopulatedPoint(id), HttpStatus.FOUND);
    }

    @PostMapping
    public @ResponseBody
    ResponseEntity<Drone> createDrone(@RequestBody DroneModel model) throws DBException {
        Drone drone = service.processDrone(model);
        service.save(drone);
        return new ResponseEntity<>(drone, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public @ResponseBody
    ResponseEntity<Drone> updateDrone(@RequestBody DroneModel model, @PathVariable Long id) throws DBException {
        Drone drone = service.find(id);
        List<Sensor> sensorsForRemove = service.updateDrone(drone, model);
        service.update(drone);
        if (sensorsForRemove != null) {
            sensorService.deleteAll(sensorsForRemove);
        }

        return ResponseEntity.ok(drone);
    }

    @DeleteMapping("/{id}")
    public void deleteDrone(@PathVariable Long id, HttpServletResponse response) throws DBException {
        service.delete(id);
        response.setStatus(HttpServletResponse.SC_OK);
    }

    // tasks for drone

    @GetMapping("/task/{id}")
    public DroneTaskModel getTask(@PathVariable String id) {
        UUID uuid = UUID.fromString(id);
        LocalProposalUser localProposalUser = localProposalUserService.findByUuid(uuid);
        Drone drone = droneService.find(localProposalUser.getDroneId());
        DroneTaskModel model = new DroneTaskModel();
        model.setUuid(uuid);
        model.setCheckPoints(GeoService.getCheckPoints());
        model.setCurrentLocation(drone.getCurrentLocation());
        model.setStartLocation(drone.getCurrentLocation());
        model.setTargetLocation(localProposalUser.getTargetCoordinates());
        return model;
    }
    
}
