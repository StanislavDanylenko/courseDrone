package com.stanislav.danylenko.course.service;

import com.stanislav.danylenko.course.db.entity.Drone;
import com.stanislav.danylenko.course.db.entity.LocalProposal;
import com.stanislav.danylenko.course.db.entity.Proposal;
import com.stanislav.danylenko.course.db.entity.location.PopulatedPoint;
import com.stanislav.danylenko.course.db.entity.pk.LocalProposalPK;
import com.stanislav.danylenko.course.db.repository.LocalProposalRepository;
import com.stanislav.danylenko.course.service.location.PopulatedPointService;
import com.stanislav.danylenko.course.web.model.LocalProposalModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class LocalProposalService {
    
    @Autowired
    private LocalProposalRepository repository;

    @Autowired
    private ProposalService proposalService;
    @Autowired
    private PopulatedPointService populatedPointService;
    @Autowired
    private DroneService droneService;

    public LocalProposal save(LocalProposal localProposal) {
        return repository.save(localProposal);
    }

    public void delete(LocalProposal localProposal) {
        repository.delete(localProposal);
    }

    public LocalProposal update(LocalProposal localProposal) {
        return repository.save(localProposal);
    }

    public LocalProposal find(LocalProposalPK id) {
        return repository.findById(id).orElse(null);
    }

    public Iterable<LocalProposal> findAll() {
        return repository.findAll();
    }

    public void delete(LocalProposalPK id) {
        repository.deleteById(id);
    }

    public Iterable<LocalProposal> findByPopulatedPoint(Long id) {
        return repository.findAllByPopulatedPointId(id);
    }

    public Iterable<LocalProposal> findByProposal(Long id) {
        return repository.findAllByProposalId(id);
    }

    public LocalProposal processLocalProposal(LocalProposalModel model) {
        LocalProposal localProposal = new LocalProposal();

        Proposal proposal = proposalService.find(model.getProposalId());
        PopulatedPoint populatedPoint = populatedPointService.find(model.getPopulatedPointId());

        localProposal.setPopulatedPoint(populatedPoint);
        localProposal.setProposal(proposal);

        List<Drone> droneList = new ArrayList<>();
        for(Long id : model.getDrones()) {
            droneList.add(droneService.find(id));
        }
        /*localProposal.setDrones(droneList);

        for (Drone drone : droneList) {
            drone.setLocalProposal(localProposal);
        }*/

        return localProposal;
    }

    //todo rewrite
    public List<Drone> updateLocalProposal(LocalProposal localProposal, LocalProposalModel model) {

        Set<Drone> dronesNew = new HashSet<>();
        for (long id : model.getDrones()) {
            dronesNew.add(droneService.find(id));
        }

       /* Set<Drone> dronesOld = new HashSet<>(localProposal.getDrones());
        Set<Drone> dronesOldCopy = new HashSet<>(dronesOld);

        dronesOld.retainAll(dronesNew);
        dronesOld.addAll(dronesNew);
        dronesOldCopy.removeAll(dronesNew);

        for (Drone drone : dronesOld) {
            drone.setLocalProposal(localProposal);
        }


        List<Drone> updatedDrones = new ArrayList<>();
        updatedDrones.addAll(dronesOld);
        localProposal.setDrones(updatedDrones);

        LocalProposal localProposalWOutProposal = new LocalProposal();
        localProposalWOutProposal.setPopulatedPoint(localProposal.getPopulatedPoint());
        for (Drone drone : dronesOldCopy) {
            drone.setLocalProposal(localProposalWOutProposal);
        }*/

        return /*new ArrayList<>(dronesOldCopy)*/null;
    }
}
