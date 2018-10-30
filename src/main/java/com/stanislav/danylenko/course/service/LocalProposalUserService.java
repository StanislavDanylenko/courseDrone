package com.stanislav.danylenko.course.service;

import com.stanislav.danylenko.course.db.entity.LocalProposal;
import com.stanislav.danylenko.course.db.entity.LocalProposalUser;
import com.stanislav.danylenko.course.db.entity.User;
import com.stanislav.danylenko.course.db.entity.pk.LocalProposalPK;
import com.stanislav.danylenko.course.db.entity.pk.LocalProposalUserPK;
import com.stanislav.danylenko.course.db.enumeration.OperationStatus;
import com.stanislav.danylenko.course.db.repository.LocalProposalUserRepository;
import com.stanislav.danylenko.course.web.model.LocalProposalUserModel;
import com.stanislav.danylenko.course.web.model.ReportModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class LocalProposalUserService {

    @Autowired
    private LocalProposalUserRepository repository;

    @Autowired
    private LocalProposalService localProposalService;

    @Autowired
    private UserService userService;


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
        // localProposalUser.setDrone(localProposal.finCompatibleDrone());

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
}
