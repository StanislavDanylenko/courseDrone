package com.stanislav.danylenko.course.service;

import com.stanislav.danylenko.course.db.entity.User;
import com.stanislav.danylenko.course.db.entity.location.Country;
import com.stanislav.danylenko.course.db.entity.location.PopulatedPoint;
import com.stanislav.danylenko.course.db.entity.location.Region;
import com.stanislav.danylenko.course.db.enumeration.RoleUser;
import com.stanislav.danylenko.course.db.repository.UserRepository;
import com.stanislav.danylenko.course.service.location.CountryService;
import com.stanislav.danylenko.course.service.location.PopulatedPointService;
import com.stanislav.danylenko.course.service.location.RegionService;
import com.stanislav.danylenko.course.web.model.location.FullLocationModel;
import com.stanislav.danylenko.course.web.model.user.UpdatePasswordModel;
import com.stanislav.danylenko.course.web.model.user.UserRegistrationModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
public class UserService implements GenericService<User>, UserDetailsService {

    @Autowired
    private PopulatedPointService populatedPointService;

    @Autowired
    private UserRepository repository;

    @Autowired
    private CountryService countryService;

    @Autowired
    private RegionService regionService;

    @Override
    public User save(User user) {
        return repository.save(user);
    }

    @Override
    public void delete(User user) {
        repository.delete(user);
    }

    @Override
    public User update(User user) {
        return repository.save(user);
    }

    @Override
    public User find(Long id) {
        return repository.findById(id).orElse(null);
    }

    @Override
    public Iterable<User> findAll() {
        return repository.findAll();
    }

    @Override
    public void delete(Long id) {
        repository.deleteById(id);
    }

    public User findByEmail(String email) {
        return repository.findByEmail(email);
    }

    public void updateUser(User oldUser, User newUser) {
        oldUser.setFirstName(newUser.getFirstName());
        oldUser.setLastName(newUser.getLastName());
        oldUser.setPatronymic(newUser.getPatronymic());
//        oldUser.setPassword(newUser.getPassword());
        oldUser.setLocalization(newUser.getLocalization());
        oldUser.setDefaultPopulatedPoint(newUser.getDefaultPopulatedPoint());
    }

    public void updateUserAdmin(User oldUser, User newUser) {
        oldUser.setFirstName(newUser.getFirstName());
        oldUser.setLastName(newUser.getLastName());
        oldUser.setPatronymic(newUser.getPatronymic());
        oldUser.setLocalization(newUser.getLocalization());
        oldUser.setDefaultPopulatedPoint(newUser.getDefaultPopulatedPoint());
        oldUser.setIsActive(newUser.getIsActive());

        if (!newUser.getRoles().isEmpty()) {
            Set<RoleUser> rolesOld = oldUser.getRoles();
            for (RoleUser role : rolesOld) {
                oldUser.removeRole(role);
            }

            Set<RoleUser> roles = newUser.getRoles();
            for (RoleUser role : roles) {
                oldUser.addRole(role);
            }
        }
    }

    public User createFromRegistrationModel(UserRegistrationModel model) {

        User user = new User();

        user.setFirstName(model.getFirstName());
        user.setLastName(model.getLastName());
        user.setPatronymic(model.getPatronymic());
        user.setLocalization(model.getLocalization());
        user.setEmail(model.getEmail());
        user.setType(model.getType());
        user.addRole(RoleUser.USER);
        user.setIsActive(model.getIsActive());

        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder(8);
        user.setPassword(passwordEncoder.encode(model.getPassword()));

        user.setDefaultPopulatedPoint(model.getDefaultPopulatedPointId());

        return user;
    }

    public User createFromRegistrationModelAdmin(UserRegistrationModel model) {
        User user = createFromRegistrationModel(model);
        user.removeRole(RoleUser.USER);
        user.addRole(RoleUser.ADMIN);
        return user;
    }

    public FullLocationModel fillInfoAboutLocation(PopulatedPoint point) {

        FullLocationModel model = new FullLocationModel();

        model.setPointId(point.getId());
        model.setPointName(point.getName());

        Region region = regionService.find(point.getRegion().getId());
        model.setRegionId(region.getId());
        model.setRegionName(region.getName());

        Country country = countryService.find(region.getCountry().getId());
        model.setCountryId(country.getId());
        model.setCountryName(country.getName());

        return model;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = repository.findByEmail(email);

        if (user == null) {
            throw new UsernameNotFoundException("User with email not found");
        }

        return user;
    }

    public boolean changePassword(UpdatePasswordModel model) {
        User user = repository.findById(model.getId()).orElse(null);
        if (user != null) {
            PasswordEncoder passwordEncoder = new BCryptPasswordEncoder(8);
            if (passwordEncoder.matches(model.getOldPassword(), user.getPassword())) {
                user.setPassword(passwordEncoder.encode(model.getNewPassword()));
                repository.save(user);
                return true;
            }
        }
        return false;
    }
}

