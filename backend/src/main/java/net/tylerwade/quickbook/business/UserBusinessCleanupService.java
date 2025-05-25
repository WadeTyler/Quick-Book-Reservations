package net.tylerwade.quickbook.business;

import net.tylerwade.quickbook.auth.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserBusinessCleanupService {
    private final BusinessRepository businessRepository;

    @Autowired
    public UserBusinessCleanupService(BusinessRepository businessRepository) {
        this.businessRepository = businessRepository;
    }

    public void removeUserFromAllStaffedBusinesses(User user) {
        for (Business business : user.getStaffedBusinesses()) {
            business.getStaff().remove(user);
            businessRepository.save(business);
        }
    }
}

