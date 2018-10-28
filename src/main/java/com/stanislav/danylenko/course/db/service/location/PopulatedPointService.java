package com.stanislav.danylenko.course.db.service.location;

import com.stanislav.danylenko.course.db.entity.location.PopulatedPoint;
import com.stanislav.danylenko.course.db.repository.location.PopulatedPointRepository;
import com.stanislav.danylenko.course.db.service.GenericService;
import com.stanislav.danylenko.course.web.model.PopulatedPointModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PopulatedPointService implements GenericService<PopulatedPoint> {

    @Autowired
    private PopulatedPointRepository repository;

    @Autowired
    private RegionService regionService;

    @Override
    public PopulatedPoint save(PopulatedPoint point) {
        return repository.save(point);
    }

    @Override
    public void delete(PopulatedPoint point) {
        repository.delete(point);
    }

    @Override
    public PopulatedPoint update(PopulatedPoint point) {
        return repository.save(point);
    }

    @Override
    public PopulatedPoint find(Long id) {
        return repository.findById(id).orElse(null);
    }

    @Override
    public Iterable<PopulatedPoint> findAll() {
        return repository.findAll();
    }

    @Override
    public void delete(Long id) {
        repository.deleteById(id);
    }

    public Iterable<PopulatedPoint> findByRegionId(Long id) {
        return repository.findAllByRegionId(id);
    }

    public void updatePopulatedPoint(PopulatedPoint point, PopulatedPointModel newPoint) {
        point.setName(newPoint.getName());
        Long regionId = newPoint.getRegionId();
        if (regionId != null) {
            point.setRegion(regionService.find(regionId));
        }
    }

    public PopulatedPointModel getViewModel(PopulatedPoint point) {
        PopulatedPointModel model = new PopulatedPointModel();
        model.setId(point.getId());
        model.setName(point.getName());
        model.setRegionId(point.getRegion().getId());
        return model;
    }

}
