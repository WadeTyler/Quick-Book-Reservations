package net.tylerwade.quickbook.service;

import io.awspring.cloud.s3.ObjectMetadata;
import io.awspring.cloud.s3.S3Resource;
import io.awspring.cloud.s3.S3Template;
import net.tylerwade.quickbook.config.AppProperties;
import net.tylerwade.quickbook.dto.business.CreateBusinessRequest;
import net.tylerwade.quickbook.dto.business.ManagedBusinessDTO;
import net.tylerwade.quickbook.exception.HttpRequestException;
import net.tylerwade.quickbook.model.Business;
import net.tylerwade.quickbook.model.User;
import net.tylerwade.quickbook.repository.BusinessRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

@Service
public class BusinessServiceImpl implements BusinessService {


    private final UserService userService;
    private final BusinessRepository businessRepository;
    private final AppProperties appProperties;
    private final S3Template s3Template;

    @Autowired
    public BusinessServiceImpl(UserService userService, BusinessRepository businessRepository, AppProperties appProperties, S3Template s3Template) {
        this.userService = userService;
        this.businessRepository = businessRepository;
        this.appProperties = appProperties;
        this.s3Template = s3Template;
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
    public Business create(CreateBusinessRequest createBusinessRequest, Authentication authentication) throws IOException {

        // Check if max application businesses has already been reached
        if (businessRepository.count() >= appProperties.maxApplicationBusinesses()) {
            throw new HttpRequestException(HttpStatus.NOT_ACCEPTABLE, "Max application businesses has been reached. Please try again later.");
        }

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
        newBusiness.setDescription(createBusinessRequest.description());

        // Save and return
        businessRepository.save(newBusiness);

        // If user is uploading image, store in S3
        if (createBusinessRequest.image() != null) {
            String objectKey = "business-image-" + newBusiness.getId() + ".jpg";
            S3Resource uploadedImage = s3Template.upload(appProperties.imageBucketName(), objectKey, createBusinessRequest.image().getInputStream(), ObjectMetadata.builder().contentType("image/jpeg").build());

            // Set image to url in bucket
            newBusiness.setImage(uploadedImage.getURL().toString());
            // Save business with image
            businessRepository.save(newBusiness);
        }

        return newBusiness;
    }

    @Override
    public ManagedBusinessDTO convertToManagedBusinessDTO(Business business) {

        // TODO: Implement upcomingReservationCount and servicesCount
        return new ManagedBusinessDTO(business.getId(),
                business.getOwnerId(),
                business.getName(),
                business.getImage(),
                business.getDescription(),
                business.getCreatedAt(),
                business.getStaffIds(),
                business.getOwner(),
                business.getStaff(),
                0L, 0);
    }
}
