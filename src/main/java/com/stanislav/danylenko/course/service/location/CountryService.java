package com.stanislav.danylenko.course.service.location;

import com.stanislav.danylenko.course.db.entity.location.Country;
import com.stanislav.danylenko.course.db.repository.location.CountryRepository;
import com.stanislav.danylenko.course.service.GenericService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CountryService implements GenericService<Country> {

    @Autowired
    private CountryRepository repository;

    @Override
    public Country save(Country country) {
        return repository.save(country);
    }

    @Override
    public void delete(Country country) {
        repository.delete(country);
    }

    @Override
    public void delete(Long id) {
        repository.deleteById(id);
    }

    @Override
    public Country update(Country country) {
        return repository.save(country);
    }

    @Override
    public Country find(Long id) {
        return repository.findById(id).orElse(null);
    }

    @Override
    public Iterable<Country> findAll() {
        return repository.findAll();
    }

    public Country findByName(String name) {
        return repository.findByName(name);
    }

    public void updateCountry(Country country, Country newCountry) {
        country.setName(newCountry.getName());
    }

}
