package com.stanislav.danylenko.course.service;

import com.stanislav.danylenko.course.db.entity.*;
import com.stanislav.danylenko.course.db.entity.bl.Report;
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
    private DroneService droneService;


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

        // logic for founding drone / todo exception if drone is unavailable
        Drone drone = findCompatibleDrone(localProposal);
        localProposalUser.setDroneId(drone.getId());
        drone.setCurrentUuid(uuid);

        return localProposalUser;
    }

    public LocalProposalUser updateLocalProposalUser(LocalProposalUser localProposalUser, ReportModel model) {
        OperationStatus status = model.getStatus();
        localProposalUser.setStatus(status);
        switch (status) {
            case NEW: // perform key points to object
                // drone find my location
                localProposalUser.setStatus(OperationStatus.GO_TO_TARGET_PALACE);
                break;
            case GO_TO_HOME:
                Report report = new Report();
                fillReportFields(report, model.getSensors());
                localProposalUser.setReport(report);
                break;
            case FINALIZED:
                Drone drone = droneService.find(localProposalUser.getDroneId());
                drone.setCurrentUuid(null);
                droneService.save(drone);
                break;
        }
        return localProposalUser;
    }

    private Drone findCompatibleDrone(LocalProposal localProposal) {

        Proposal proposal = localProposal.getProposal();
        PopulatedPoint populatedPoint = localProposal.getPopulatedPoint();

        Set<TypeOfSensor> typeOfSensors = proposal.getSensors();
        List<Drone> drones = populatedPoint.getDrones();

        Set<Drone> compatibleTypeDrones = new TreeSet<>();

        for (Drone drone : drones) {
            if (drone.getCurrentUuid() == null) {
                List<Sensor> sensors = drone.getSensors();
                Set<TypeOfSensor> sensorsInDrone = new HashSet<>();
                for (Sensor sensor : sensors) {
                    sensorsInDrone.add(sensor.getType());
                }
                if (sensorsInDrone.containsAll(typeOfSensors)) {
                    compatibleTypeDrones.add(drone);
                }
            }
        }

        if (compatibleTypeDrones.size() > 0) {
            return ((TreeSet<Drone>) compatibleTypeDrones).first();
        }
        return null;
    }

    private void fillReportFields(Report report, List<Sensor> sensors) {
        for (Sensor sensor : sensors) {
            switch (sensor.getType()) {
                case HUMIDITY:
                    report.setHumidity(sensor.getValue());
                    break;
                /*case CAMERA:
                    report.setPhoto(sensor.getValue()); // think how to?
                    break;*/
                case PRESSURE:
                    report.setPressure(sensor.getValue());
                    break;
                case AIR_POLLUTION:
                    report.setAirPollution(sensor.getValue());
                    break;
                case RADIATION:
                    report.setRadiation(sensor.getValue());
                    break;
                case TEMPERATURE:
                    report.setTemperature(sensor.getValue());
                    break;
            }
        }
    }

}
