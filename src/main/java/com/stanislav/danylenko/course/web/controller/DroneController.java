package com.stanislav.danylenko.course.web.controller;

import com.fasterxml.jackson.annotation.JsonView;
import com.stanislav.danylenko.course.JsonRules;
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
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.util.List;
import java.util.UUID;


@RestController
@PreAuthorize("hasAuthority('ADMIN')")
@RequestMapping("/drones")
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
    @JsonView(value = JsonRules.DroneCustom.class)
    public @ResponseBody
    ResponseEntity<Iterable<Drone>> getDrones() throws DBException {
        return ResponseEntity.ok(service.findAll());
    }

    @GetMapping("/{id}")
    @JsonView(value = JsonRules.DroneCustom.class)
    public @ResponseBody
    ResponseEntity<Drone> getDrone(@PathVariable Long id) throws DBException {
        return new ResponseEntity<>(service.find(id), HttpStatus.OK);
    }

    @GetMapping("/point/{id}")
    @JsonView(value = JsonRules.DroneCustom.class)
    public @ResponseBody
    ResponseEntity<Iterable<Drone>> getDroneByPopulatedPoint(@PathVariable Long id) throws DBException {
        return new ResponseEntity<>(service.findByPopulatedPoint(id), HttpStatus.OK);
    }

    @PostMapping
    @JsonView(value = JsonRules.DroneCustom.class)
    public @ResponseBody
    ResponseEntity<Drone> createDrone(@RequestBody DroneModel model) throws DBException {
        Drone drone = service.createFromModel(model);
        service.save(drone);
        return new ResponseEntity<>(drone, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    @JsonView(value = JsonRules.DroneCustom.class)
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
    @JsonView(value = JsonRules.DroneCustom.class)
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
