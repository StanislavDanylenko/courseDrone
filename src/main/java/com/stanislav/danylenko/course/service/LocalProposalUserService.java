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

import java.math.BigDecimal;
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

    public Iterable<LocalProposalUser> findAllByUserIdAndStatus(Long id, OperationStatus status) {
        return repository.findAllByUserIdAndStatus(id, status);
    }

    public Iterable<LocalProposalUser> findAllByUserIdAndStatusNot(Long id, OperationStatus status1, OperationStatus status2) {
        return repository.findAllByUserIdAndStatusNotAndStatusNot(id, status1, status2);
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

    public LocalProposalUser createLocalProposalUser(LocalProposalUserModel model) throws Exception {

        LocalProposalUser localProposalUser = new LocalProposalUser();

        LocalProposalPK localProposalPK = new LocalProposalPK(model.getPopulatedPointId(), model.getProposalId());
        LocalProposal localProposal = localProposalService.find(localProposalPK);

        User user = userService.find(model.getUserId());

        localProposalUser.setLocalProposal(localProposal);
        localProposalUser.setUser(user);

        localProposalUser.setStatus(OperationStatus.NEW);
        localProposalUser.setTargetCoordinates(model.getTargetCoordinates());
        localProposalUser.setPrice(localProposal.getPrice());

        UUID uuid = UUID.randomUUID();
        localProposalUser.setUuid(uuid);

        // todo test it
        Drone drone = findCompatibleDrone(localProposal);
        if (drone == null) {
            throw new Exception("drone is unavailable");
        }
        localProposalUser.setDroneId(drone.getId());
        drone.setCurrentUuid(uuid);

        return localProposalUser;
    }

    public LocalProposalUser updateLocalProposalUser(LocalProposalUser localProposalUser, ReportModel model) {
        OperationStatus status = model.getStatus();
        localProposalUser.setStatus(status);
        Drone drone = null;
        switch (status) {
            case NEW:
                localProposalUser.setStatus(OperationStatus.GO_TO_TARGET_PALACE);
                break;
            case GO_TO_HOME:
                Report report = new Report();
                drone = droneService.find(localProposalUser.getDroneId());
                fillReportFields(report, drone.getSensors());
                localProposalUser.setReport(report);
                break;
            case FINALIZED:
                drone = droneService.find(localProposalUser.getDroneId());
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
                //todo test it
                if (sensorsInDrone.containsAll(typeOfSensors) && drone.getIsAvailable()) {
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
