package com.stanislav.danylenko.course.db.service.location;

import com.stanislav.danylenko.course.db.entity.location.Country;
import com.stanislav.danylenko.course.db.entity.location.Region;
import com.stanislav.danylenko.course.db.repository.location.CountryRepository;
import com.stanislav.danylenko.course.db.repository.location.RegionRepository;
import com.stanislav.danylenko.course.db.service.GenericService;
import com.stanislav.danylenko.course.web.model.RegionModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RegionService implements GenericService<Region> {

    @Autowired
    private RegionRepository repository;

    @Autowired
    private CountryService countryService;

    @Override
    public Region save(Region Region) {
        return repository.save(Region);
    }

    @Override
    public void delete(Region Region) {
        repository.delete(Region);
    }

    @Override
    public void delete(Long id) {
        repository.deleteById(id);
    }

    @Override
    public Region update(Region Region) {
        return repository.save(Region);
    }

    @Override
    public Region find(Long id) {
        return repository.findById(id).orElse(null);
    }

    @Override
    public Iterable<Region> findAll() {
        return repository.findAll();
    }

    public Region findByName(String name) {
        return repository.findByName(name);
    }

    public Iterable<Region> findByCountryId(Long id) {
        return repository.findAllByCountry_Id(id);
    }

    public void updateRegion(Region region, RegionModel newRegion) {
        region.setName(newRegion.getName());
        Long countryId = newRegion.getCountryId();
        if (countryId != null) {
            region.setCountry(countryService.find(countryId));
        }
    }

    public RegionModel getViewModel(Region region) {
        RegionModel model = new RegionModel();
        model.setName(region.getName());
        model.setNameCountry(region.getCountry().getName());
        model.setCountryId(region.getCountry().getId());
        return model;
    }
    
}
