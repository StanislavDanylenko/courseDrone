package com.stanislav.danylenko.course.web.controller.location;

import com.fasterxml.jackson.annotation.JsonView;
import com.stanislav.danylenko.course.JsonRules;
import com.stanislav.danylenko.course.db.entity.User;
import com.stanislav.danylenko.course.db.entity.location.Country;
import com.stanislav.danylenko.course.service.location.CountryService;
import com.stanislav.danylenko.course.exception.DBException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/countries")
public class CountryController {

    @Autowired
    private CountryService service;

    @GetMapping
    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('USER')")
    @JsonView(value = JsonRules.PartialLocation.class)
    public @ResponseBody
    ResponseEntity<Iterable<Country>> getCountries() throws DBException {
        return ResponseEntity.ok(service.findAll());
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('USER')")
    @JsonView(value = JsonRules.PartialLocation.class)
    public @ResponseBody
    ResponseEntity<Country> getCountry(@PathVariable Long id) throws DBException {
        return new ResponseEntity<>(service.find(id), HttpStatus.OK);
    }

    @PostMapping
    @PreAuthorize("hasAuthority('ADMIN')")
    @JsonView(value = JsonRules.PartialLocation.class)
    public @ResponseBody
    ResponseEntity<Country> createCountry(@RequestBody Country country) throws DBException {
        service.save(country);
        return new ResponseEntity<>(country, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    @JsonView(value = JsonRules.PartialLocation.class)
    public @ResponseBody
    ResponseEntity<Country> updateCountry(@RequestBody Country newCountry, @PathVariable Long id) throws DBException {
        Country country = service.find(id);
        service.updateCountry(country, newCountry);
        service.update(country);
        return ResponseEntity.ok(country);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public void deleteCountry(@PathVariable Long id, HttpServletResponse response) throws DBException {
        service.delete(id);
        response.setStatus(HttpServletResponse.SC_OK);
    }

    @GetMapping("/full")
    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('USER')")
    public ResponseEntity<Iterable<Country>> getCountriesFull() throws DBException {
        return ResponseEntity.ok(service.findAll());
    }

    // todo delete in next version
    @GetMapping("/test")
    public @ResponseBody
    Object getCountries(Authentication auth) throws DBException {
        User user = (User) (auth.getPrincipal());
        return user.getLocalization();
    }

}
