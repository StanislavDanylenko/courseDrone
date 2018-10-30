package com.stanislav.danylenko.course.service;

import com.stanislav.danylenko.course.db.entity.*;
import com.stanislav.danylenko.course.db.entity.location.PopulatedPoint;
import com.stanislav.danylenko.course.db.entity.pk.LocalProposalPK;
import com.stanislav.danylenko.course.db.entity.pk.LocalProposalUserPK;
import com.stanislav.danylenko.course.db.enumeration.OperationStatus;
import com.stanislav.danylenko.course.db.enumeration.TypeOfSensor;
import com.stanislav.danylenko.course.db.repository.LocalProposalUserRepository;
import com.stanislav.danylenko.course.service.location.PopulatedPointService;
import com.stanislav.danylenko.course.web.model.LocalProposalUserModel;
import com.stanislav.danylenko.course.web.model.ReportModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class LocalProposalUserService {

    @Autowired
    private LocalProposalUserRepository repository;

    @Autowired
    private LocalProposalService localProposalService;

    @Autowired
    private UserService userService;

    @Autowired
    private ProposalService proposalService;

    @Autowired
    private PopulatedPointService populatedPointService;


    public LocalProposalUser save(LocalProposalUser localProposalUser) {
        return repository.save(localProposalUser);
    }

    public void delete(LocalProposalUser localProposalUser) {
        repository.delete(localProposalUser);
    }

    public LocalProposalUser update(LocalProposalUser localProposalUser) {
        return repository.save(localProposalUser);
    }

    public LocalProposalUser find(LocalProposalUserPK id) {
        return repository.findById(id).orElse(null);
    }

    public Iterable<LocalProposalUser> findAll() {
        return repository.findAll();
    }

    public void delete(LocalProposalUserPK id) {
        repository.deleteById(id);
    }

    public Iterable<LocalProposalUser> findAllByProposalId(Long id) {
        return repository.findAllByLocalProposal_ProposalId(id);
    }
    public Iterable<LocalProposalUser> findAllByUserId(Long id) {
        return repository.findAllByUserId(id);
    }
    public Iterable<LocalProposalUser> findAllByPopulatedPointId(Long id) {
        return repository.findAllByLocalProposal_PopulatedPointId(id);
    }
    public Iterable<LocalProposalUser> findAllByLocalProposal(LocalProposal id) {
        return repository.findAllByLocalProposal(id);
    }

    public LocalProposalUser findByUuid(UUID uuid) {
        return repository.findByUuid(uuid);
    }

    public LocalProposalUser processLocalProposalUser(LocalProposalUserModel model) {
        LocalProposalUser localProposalUser = new LocalProposalUser();

        LocalProposalPK localProposalPK = new LocalProposalPK(model.getPopulatedPointId(), model.getProposalId());
        LocalProposal localProposal = localProposalService.find(localProposalPK);

        User user  = userService.find(model.getUserId());

        localProposalUser.setLocalProposal(localProposal);
        localProposalUser.setUser(user);

        localProposalUser.setStatus(OperationStatus.NEW);

        UUID uuid = UUID.randomUUID();
        localProposalUser.setUuid(uuid);

        // todo logic for founding drone
        Drone drone = findCompatibleDrone(localProposal);
        localProposalUser.setDroneId(drone.getId());
        drone.setCurrentUuid(uuid);

        return localProposalUser;
    }

    public LocalProposalUser updateLocalProposalUser(LocalProposalUser localProposalUser, ReportModel model) {
        OperationStatus status = model.getStatus();
        localProposalUser.setStatus(status);
        if (status == OperationStatus.FINALIZED) {
            // удалить у дрона текущую операцию
        } else if (status == OperationStatus.GO_TO_HOME) {
            // считать состояние датчиков и отправить отчет
        }
        return localProposalUser;
    }

    private Drone findCompatibleDrone(LocalProposal localProposal) {
        Drone finalDrone = null;
        Proposal proposal = localProposal.getProposal();
        PopulatedPoint populatedPoint = localProposal.getPopulatedPoint();

        Set<TypeOfSensor> typeOfSensors = proposal.getSensors();
        List<Drone> drones = populatedPoint.getDrones();

        Set<Drone> compatibleTypeDrones = new TreeSet<>();

        for (Drone drone : drones) {
            List<Sensor> sensors = drone.getSensors();
            Set<TypeOfSensor> sensorsInDrone = new HashSet<>();
            for (Sensor sensor : sensors) {
                sensorsInDrone.add(sensor.getType());
            }
            if (sensorsInDrone.containsAll(typeOfSensors)) {
                compatibleTypeDrones.add(drone);
            }
        }

        if (compatibleTypeDrones.size() > 0) {
            return ((TreeSet<Drone>) compatibleTypeDrones).first();
        }
        return finalDrone;
    }
}
