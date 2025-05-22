package net.tylerwade.quickbook.business;

import io.awspring.cloud.s3.ObjectMetadata;
import io.awspring.cloud.s3.S3Resource;
import io.awspring.cloud.s3.S3Template;
import net.tylerwade.quickbook.auth.UserService;
import net.tylerwade.quickbook.business.dto.CreateBusinessRequest;
import net.tylerwade.quickbook.business.dto.StaffManagementDTO;
import net.tylerwade.quickbook.business.dto.UpdateBusinessRequest;
import net.tylerwade.quickbook.config.AppProperties;
import net.tylerwade.quickbook.exception.HttpRequestException;
import net.tylerwade.quickbook.auth.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.io.IOException;
import java.util.List;

@org.springframework.stereotype.Service
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
    public List<Business> findAll() {
        return businessRepository.findAll();
    }

    @Override
    public Business findById(String businessId) throws HttpRequestException {
        return businessRepository.findByIdIgnoreCase(businessId)
                .orElseThrow(() -> new HttpRequestException(HttpStatus.NOT_FOUND, "Business not found."));
    }

    @Override
    public Business findByIdAndOwner(String businessId, Authentication authentication) throws HttpRequestException {
        return businessRepository.findByIdIgnoreCaseAndOwner(businessId, userService.getUser(authentication))
                .orElseThrow(() -> new HttpRequestException(HttpStatus.NOT_FOUND, "Business not found or you are not authorized to perform this action."));
    }

    @Override
    public List<Business> findAllByOwnerOrStaff(Authentication authentication) {
        return businessRepository.findAllByOwnerOrStaff(userService.getUser(authentication));
    }

    @Override
    public Business findByIdAndOwnerOrStaff(String businessId, Authentication authentication) throws HttpRequestException {
        return businessRepository.findByIdIgnoreCaseAndOwnerOrStaff(businessId, userService.getUser(authentication))
                .orElseThrow(() -> new HttpRequestException(HttpStatus.NOT_FOUND, "Business not found."));
    }

    @Override
    public Business create(CreateBusinessRequest createBusinessRequest, Authentication authentication) throws IOException {

        // Check if max application businesses has already been reached
        if (businessRepository.count() >= appProperties.maxApplicationBusinesses()) {
            throw new HttpRequestException(HttpStatus.NOT_ACCEPTABLE, "Max application businesses has been reached. Please try again later.");
        }

        // Check if a business exists by id
        if (businessRepository.existsByIdIgnoreCase((createBusinessRequest.id()))) {
            throw new HttpRequestException(HttpStatus.CONFLICT, "A Business already exists with that Abbreviation.");
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
        newBusiness.setId(createBusinessRequest.id());
        newBusiness.setOwner(user);
        newBusiness.setName(createBusinessRequest.name());
        newBusiness.setDescription(createBusinessRequest.description());

        // Save and return
        businessRepository.save(newBusiness);

        // If user is uploading image, store in S3
        if (createBusinessRequest.image() != null) {
            S3Resource uploadedImage = s3Template.upload(appProperties.imageBucketName(), newBusiness.getImageObjectKey(), createBusinessRequest.image().getInputStream(), ObjectMetadata.builder().contentType("image/jpeg").build());

            // Set image to url in bucket
            newBusiness.setImage(uploadedImage.getURL().toString());
            // Save business with image
            businessRepository.save(newBusiness);
        }

        return newBusiness;
    }

    @Override
    public Business update(String businessId, UpdateBusinessRequest updateBusinessRequest, Authentication authentication) throws IOException {

        User authUser = userService.getUser(authentication);

        // Find target business
        Business business = businessRepository.findByIdIgnoreCaseAndOwner(businessId, authUser)
                .orElseThrow(() -> new HttpRequestException(HttpStatus.NOT_FOUND, "Business not found or you are not authorized to make this change."));

        // Check if business already exists with target name
        if (businessRepository.existsByNameAndIdNot(updateBusinessRequest.name(), businessId)) {
            throw new HttpRequestException(HttpStatus.NOT_ACCEPTABLE, "A business already exists with that name.");
        }

        // Update fields
        business.setName(updateBusinessRequest.name());
        business.setDescription(updateBusinessRequest.description());

        // If changing image
        if (updateBusinessRequest.image() != null && !updateBusinessRequest.removeImage()) {
            S3Resource uploadedImage = s3Template.upload(appProperties.imageBucketName(), business.getImageObjectKey(), updateBusinessRequest.image().getInputStream());
            business.setImage(uploadedImage.getURL().toString());
        } else if (updateBusinessRequest.removeImage() && business.getImage() != null) {
            // Handle removing image if checked
            s3Template.deleteObject(appProperties.imageBucketName(), business.getImageObjectKey());
            business.setImage(null);
        }

        // Save and return
        businessRepository.save(business);
        return business;
    }

    @Override
    public Business addStaffMember(String businessId, StaffManagementDTO staffManagementDTO, Authentication authentication) throws HttpRequestException {
        // Find the business and verify the authenticated user is the owner or staff
        Business business = findByIdAndOwnerOrStaff(businessId, authentication);

        User authUser = userService.getUser(authentication);

        // Check if user is the owner of the business
        if (!business.getOwnerId().equals(authUser.getId())) {
            throw new HttpRequestException(HttpStatus.UNAUTHORIZED, "You must be the owner of a business to add staff members.");
        }

        // Check if self
        if (authUser.getUsername().equals(staffManagementDTO.email())) {
            throw new HttpRequestException(HttpStatus.NOT_ACCEPTABLE, "You cannot add yourself to staff.");
        }

        try {
            // Find the user to add as staff by email (username)
            User userToAdd = userService.loadUserByUsername(staffManagementDTO.email());

            // Check if the user is already a staff member
            if (business.getStaff().contains(userToAdd)) {
                throw new HttpRequestException(HttpStatus.BAD_REQUEST, "User is already a staff member.");
            }

            // Add the user to staff
            business.getStaff().add(userToAdd);

            // Save and return the updated business
            return businessRepository.save(business);

        } catch (UsernameNotFoundException e) {
            throw new HttpRequestException(HttpStatus.NOT_FOUND, "User not found with email: " + staffManagementDTO.email());
        }
    }

    @Override
    public Business removeStaffMember(String businessId, String staffId, Authentication authentication) throws HttpRequestException {
        // Find the business and verify the authenticated user is the owner or staff
        Business business = findByIdAndOwnerOrStaff(businessId, authentication);

        User authUser = userService.getUser(authentication);

        // Check if user is the owner of the business
        if (!business.getOwnerId().equals(authUser.getId())) {
            throw new HttpRequestException(HttpStatus.UNAUTHORIZED, "You must be the owner of a business to add staff members.");
        }

        // Check if self
        if (authUser.getId().equals(staffId)) {
            throw new HttpRequestException(HttpStatus.NOT_ACCEPTABLE, "You cannot remove yourself from staff.");
        }

        // Find the user to remove from staff by id
        User userToRemove = userService.findById(staffId);



        // Check if the user is a staff member
        if (!business.getStaff().contains(userToRemove)) {
            throw new HttpRequestException(HttpStatus.BAD_REQUEST, "User is not a staff member.");
        }

        // Remove the user from staff
        business.getStaff().remove(userToRemove);

        // Save and return the updated business
        return businessRepository.save(business);
    }

    @Override
    public void deleteBusiness(String businessId, Authentication authentication) throws HttpRequestException {
        User authUser = userService.getUser(authentication);
        // Find the business and verify user is owner
        Business business = businessRepository.findByIdIgnoreCaseAndOwner(businessId, authUser)
                .orElseThrow(() -> new HttpRequestException(HttpStatus.NOT_FOUND, "Business not found or you are not authorized to perform this action."));


        // Delete image from store if present
        if (business.getImage() != null) {
            s3Template.deleteObject(appProperties.imageBucketName(), business.getImageObjectKey());
        }

        // Delete
        businessRepository.delete(business);
    }





}
