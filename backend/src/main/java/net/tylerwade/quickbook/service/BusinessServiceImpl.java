package net.tylerwade.quickbook.service;

import net.tylerwade.quickbook.exception.HttpRequestException;
import net.tylerwade.quickbook.model.Business;
import net.tylerwade.quickbook.repository.BusinessRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BusinessServiceImpl implements BusinessService {


    private final UserService userService;
    private final BusinessRepository businessRepository;

    @Autowired
    public BusinessServiceImpl(UserService userService, BusinessRepository businessRepository) {
        this.userService = userService;
        this.businessRepository = businessRepository;
    }

    @Override
    public List<Business> findAllByOwnerOrStaff(Authentication authentication) throws HttpRequestException {
        return businessRepository.findAllByOwnerOrStaff(userService.getUser(authentication).getId());
    }

    @Override
    public Business findByIdAndOwnerOrStaff(String businessId, Authentication authentication) throws HttpRequestException {
        return businessRepository.findByIdAndOwnerOrStaff(businessId, userService.getUser(authentication).getId())
                .orElseThrow(() -> new HttpRequestException(HttpStatus.NOT_FOUND, "Business not found."));
    }
}
