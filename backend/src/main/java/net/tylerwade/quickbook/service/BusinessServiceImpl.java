package net.tylerwade.quickbook.service;

import net.tylerwade.quickbook.config.AppProperties;
import net.tylerwade.quickbook.dto.business.CreateBusinessRequest;
import net.tylerwade.quickbook.exception.HttpRequestException;
import net.tylerwade.quickbook.model.Business;
import net.tylerwade.quickbook.model.User;
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
    private final AppProperties appProperties;

    @Autowired
    public BusinessServiceImpl(UserService userService, BusinessRepository businessRepository, AppProperties appProperties) {
        this.userService = userService;
        this.businessRepository = businessRepository;
        this.appProperties = appProperties;
    }

    @Override
    public List<Business> findAllByOwnerOrStaff(Authentication authentication) throws HttpRequestException {
        return businessRepository.findAllByOwnerOrStaff(userService.getUser(authentication));
    }

    @Override
    public Business findByIdAndOwnerOrStaff(String businessId, Authentication authentication) throws HttpRequestException {
        return businessRepository.findByIdAndOwnerOrStaff(businessId, userService.getUser(authentication))
                .orElseThrow(() -> new HttpRequestException(HttpStatus.NOT_FOUND, "Business not found."));
    }

    @Override
    public Business create(CreateBusinessRequest createBusinessRequest, Authentication authentication) throws HttpRequestException {
        // Check if a business already has name
        if (businessRepository.existsByName(createBusinessRequest.name())) {
            throw new HttpRequestException(HttpStatus.NOT_ACCEPTABLE, "A business already exists with this name.");
        }

        User user = userService.getUser(authentication);

        // Check if user reached maximum businesses
        if (businessRepository.countAllByOwner(user) >= appProperties.maxUserBusinesses()) {
            throw new HttpRequestException(HttpStatus.NOT_ACCEPTABLE, "You have reached the maximum amount of businesses: " + appProperties.maxUserBusinesses());
        }

        // Create new business
        Business newBusiness = new Business();
        newBusiness.setOwner(user);
        newBusiness.setName(createBusinessRequest.name());
        newBusiness.setImage(createBusinessRequest.image());
        newBusiness.setDescription(createBusinessRequest.description());


        // Save and return
        businessRepository.save(newBusiness);
        return newBusiness;
    }

}
