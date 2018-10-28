package com.stanislav.danylenko.course.web.controller.location;

import com.stanislav.danylenko.course.db.entity.location.Country;
import com.stanislav.danylenko.course.db.service.location.CountryService;
import com.stanislav.danylenko.course.exception.DBException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/countries")
public class CountryController {

    @Autowired
    private CountryService service;

    @GetMapping
    public @ResponseBody
    ResponseEntity<Iterable<Country>> getCountries() throws DBException {
        return ResponseEntity.ok(service.findAll());
    }

    @GetMapping("/{id}")
    public @ResponseBody
    ResponseEntity<Country> getCountry(@PathVariable Long id) throws DBException {
        return new ResponseEntity<>(service.find(id), HttpStatus.FOUND);
    }

    @PostMapping
    public @ResponseBody
    ResponseEntity<Country> createCountry(@RequestBody Country country) throws DBException {
        service.save(country);
        return new ResponseEntity<>(country, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public @ResponseBody
    ResponseEntity<Country> updateCountry(@RequestBody Country newCountry, @PathVariable Long id) throws DBException {
        Country Country = service.find(id);
        service.updateCountry(Country, newCountry);
        service.update(Country);
        return ResponseEntity.ok(Country);
    }

    @DeleteMapping("/{id}")
    public void deleteCountry(@PathVariable Long id, HttpServletResponse response) throws DBException {
        service.delete(id);
        response.setStatus(HttpServletResponse.SC_OK);
    }
    
}
