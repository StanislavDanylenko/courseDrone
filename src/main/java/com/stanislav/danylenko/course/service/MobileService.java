package com.stanislav.danylenko.course.service;

import com.stanislav.danylenko.course.db.entity.LocalProposalUser;
import com.stanislav.danylenko.course.db.entity.User;
import com.stanislav.danylenko.course.web.model.mobile.UserOrderModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class MobileService {

    @Autowired
    private UserService userService;

    public User authenticateUser(String email, String password) {
        User user = userService.findByEmail(email);
        if (user != null) {
            PasswordEncoder passwordEncoder = new BCryptPasswordEncoder(8);
            if (passwordEncoder.matches(password, user.getPassword())) {
                return user;
            }
        }
        return null;
    }

    public List<UserOrderModel> processUserOrders(Iterable<LocalProposalUser> userOrders) {
        List<UserOrderModel> orders = new ArrayList<>();

        for (LocalProposalUser order : userOrders) {
            UserOrderModel model = new UserOrderModel();

            model.setDroneId(order.getDroneId());
            model.setLocalProposal(order.getLocalProposal());
            model.setPrice(order.getPrice());
            model.setReport(order.getReport());
            model.setStatus(order.getStatus());
            model.setTargetCoordinates(order.getTargetCoordinates());
            model.setUuid(order.getUuid());

            orders.add(model);
        }
        return orders;
    }

}
