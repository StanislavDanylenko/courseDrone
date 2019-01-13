package com.stanislav.danylenko.course.web.controller.calculator;

import com.fasterxml.jackson.annotation.JsonView;
import com.stanislav.danylenko.course.JsonRules;
import com.stanislav.danylenko.course.db.entity.Drone;
import com.stanislav.danylenko.course.exception.DBException;
import com.stanislav.danylenko.course.service.calculator.CalculatorService;
import com.stanislav.danylenko.course.web.model.calculator.CalculateResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@PreAuthorize("hasAuthority('USER')")
@RequestMapping("/calculator")
public class CalculatorController {

    @Autowired
    private CalculatorService service;


    @GetMapping("/{latitude}/{longitude}")
    public @ResponseBody
    ResponseEntity<CalculateResult> getTime(@PathVariable("latitude") Double latitude,
                                            @PathVariable("longitude") Double longitude) throws DBException {
        return ResponseEntity.ok(service.calculate(latitude, longitude));
    }

}
