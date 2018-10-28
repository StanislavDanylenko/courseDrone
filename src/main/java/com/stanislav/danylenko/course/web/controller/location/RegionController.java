package com.stanislav.danylenko.course.web.controller.location;

import com.stanislav.danylenko.course.db.entity.location.Region;
import com.stanislav.danylenko.course.db.service.location.RegionService;
import com.stanislav.danylenko.course.exception.DBException;
import com.stanislav.danylenko.course.web.model.RegionModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/regions")
public class RegionController {

    @Autowired
    private RegionService service;

    @GetMapping
    public @ResponseBody
    ResponseEntity<Iterable<Region>> getCountries() throws DBException {
        return ResponseEntity.ok(service.findAll());
    }

    @GetMapping("/{id}")
    public @ResponseBody
    ResponseEntity<RegionModel> getRegion(@PathVariable Long id) throws DBException {
        Region region = service.find(id);
        RegionModel model = service.getViewModel(region);
        return new ResponseEntity<>(model, HttpStatus.FOUND);
    }

    @PostMapping
    public @ResponseBody
    ResponseEntity<RegionModel> createRegion(@RequestBody RegionModel regionModel) throws DBException {
        Region region = new Region();
        service.updateRegion(region, regionModel);
        service.save(region);
        regionModel = service.getViewModel(region);
        return new ResponseEntity<>(regionModel, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public @ResponseBody
    ResponseEntity<RegionModel> updateRegion(@RequestBody RegionModel newRegion, @PathVariable Long id) throws DBException {
        Region region = service.find(id);
        service.updateRegion(region, newRegion);
        service.update(region);
        newRegion = service.getViewModel(region);
        return ResponseEntity.ok(newRegion);
    }

    @DeleteMapping("/{id}")
    public void deleteRegion(@PathVariable Long id, HttpServletResponse response) throws DBException {
        service.delete(id);
        response.setStatus(HttpServletResponse.SC_OK);
    }

    @GetMapping("/country/{id}")
    public @ResponseBody
    ResponseEntity<Iterable<Region>> getRegionsInCountry(@PathVariable Long id) throws DBException {
        return ResponseEntity.ok(service.findByCountryId(id));
    }
    
}
