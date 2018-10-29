package com.stanislav.danylenko.course.web.controller;

import com.stanislav.danylenko.course.db.entity.Drone;
import com.stanislav.danylenko.course.db.repository.DroneRepository;
import com.stanislav.danylenko.course.exception.DBException;
import com.stanislav.danylenko.course.service.DroneService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/drones")
public class DroneController {
    
    @Autowired
    private DroneService service;

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

    @PostMapping
    public @ResponseBody
    ResponseEntity<Drone> createDrone(@RequestBody Drone drone) throws DBException {
        service.processDrone(drone);
        service.save(drone);
        return new ResponseEntity<>(drone, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public @ResponseBody
    ResponseEntity<Drone> updateDrone(@RequestBody Drone newDrone, @PathVariable Long id) throws DBException {
        Drone drone = service.find(id);
        service.updateDrone(drone, newDrone);
        service.update(drone);
        return ResponseEntity.ok(drone);
    }

    @DeleteMapping("/{id}")
    public void deleteDrone(@PathVariable Long id, HttpServletResponse response) throws DBException {
        service.delete(id);
        response.setStatus(HttpServletResponse.SC_OK);
    }
    
}
