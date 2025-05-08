package net.tylerwade.quickbook.serviceOffering;

import io.awspring.cloud.s3.S3Resource;
import io.awspring.cloud.s3.S3Template;
import net.tylerwade.quickbook.business.BusinessService;
import net.tylerwade.quickbook.config.AppProperties;
import net.tylerwade.quickbook.exception.HttpRequestException;
import net.tylerwade.quickbook.business.Business;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
public class ServiceOfferingServiceImpl implements ServiceOfferingService {

    private final ServiceOfferingRepository serviceOfferingRepository;
    private final BusinessService businessService;
    private final AppProperties appProperties;
    private final S3Template s3Template;

    public ServiceOfferingServiceImpl(ServiceOfferingRepository serviceOfferingRepository, BusinessService businessService, AppProperties appProperties, S3Template s3Template) {
        this.serviceOfferingRepository = serviceOfferingRepository;
        this.businessService = businessService;
        this.appProperties = appProperties;
        this.s3Template = s3Template;
    }

    @Override
    public Business createService(String businessId, ManageServiceOfferingRequest manageServiceOfferingRequest, Authentication authentication) throws IOException {
        // Find the business and verify user is owner
        Business business = businessService.findByIdAndOwner(businessId, authentication);

        // Check if at max services
        if (business.getServiceOfferings().size() >= appProperties.maxBusinessServices()) {
            throw new HttpRequestException(HttpStatus.NOT_ACCEPTABLE, "You have reached the max amount of services for this business.");
        }

        // Check if business already has a service with name
        if (serviceOfferingRepository.existsByBusinessAndNameEqualsIgnoreCase(business, manageServiceOfferingRequest.name())) {
            throw new HttpRequestException(HttpStatus.NOT_ACCEPTABLE, "A service with that name already exists in this business.");
        }

        // Create service
        ServiceOffering serviceOffering = new ServiceOffering();
        serviceOffering.setBusiness(business);
        serviceOffering.setType(manageServiceOfferingRequest.type());
        serviceOffering.setName(manageServiceOfferingRequest.name());
        serviceOffering.setDescription(manageServiceOfferingRequest.description());

        // Save
        serviceOfferingRepository.save(serviceOffering);

        // Add image to store if sent
        if (manageServiceOfferingRequest.image() != null) {
            S3Resource uploaded = s3Template.upload(appProperties.imageBucketName(), serviceOffering.getImageObjectKey(), manageServiceOfferingRequest.image().getInputStream());

            serviceOffering.setImage(uploaded.getURL().toString());
            serviceOfferingRepository.save(serviceOffering);
        }

        // Return updated business
        return businessService.findByIdAndOwner(businessId, authentication);
    }

    @Override
    public Business updateService(String businessId, Long serviceId, ManageServiceOfferingRequest manageServiceOfferingRequest, Authentication authentication) throws IOException {
        // Find target service
        Business business = businessService.findByIdAndOwner(businessId, authentication);
        ServiceOffering serviceOffering = business.getServiceOfferings().stream()
                .filter(s -> s.getId().equals(serviceId))
                .findFirst()
                .orElseThrow(() -> new HttpRequestException(HttpStatus.NOT_FOUND, "Service not found."));

        // Check if business already has a service with name
        if (serviceOfferingRepository.existsByBusinessAndNameEqualsIgnoreCaseAndIdNot(business, manageServiceOfferingRequest.name(), serviceId)) {
            throw new HttpRequestException(HttpStatus.NOT_ACCEPTABLE, "A service with that name already exists in this business.");
        }

        // Update
        serviceOffering.setName(manageServiceOfferingRequest.name());
        serviceOffering.setDescription(manageServiceOfferingRequest.description());
        serviceOffering.setType(manageServiceOfferingRequest.type());

        // If changing image
        if (manageServiceOfferingRequest.image() != null && !manageServiceOfferingRequest.removeImage()) {
            S3Resource uploadedImage = s3Template.upload(appProperties.imageBucketName(), serviceOffering.getImageObjectKey(), manageServiceOfferingRequest.image().getInputStream());
            serviceOffering.setImage(uploadedImage.getURL().toString());
        } else if (manageServiceOfferingRequest.removeImage() && serviceOffering.getImage() != null) {
            // Handle removing image if checked
            s3Template.deleteObject(appProperties.imageBucketName(), serviceOffering.getImageObjectKey());
            serviceOffering.setImage(null);
        }

        // Save
        serviceOfferingRepository.save(serviceOffering);

        // Return updated business
        return businessService.findByIdAndOwner(businessId, authentication);
    }

    @Override
    public Business deleteService(String businessId, Long serviceId, Authentication authentication) throws HttpRequestException {
        Business business = businessService.findByIdAndOwner(businessId, authentication);

        ServiceOffering serviceOffering = business.getServiceOfferings().stream()
                .filter(s -> s.getId().equals(serviceId))
                .findFirst()
                .orElseThrow(() -> new HttpRequestException(HttpStatus.NOT_FOUND, "Service not found."));

        // If service has image remove from store
        if (serviceOffering.getImage() != null) {
            s3Template.deleteObject(appProperties.imageBucketName(), serviceOffering.getImageObjectKey());
        }

        // Delete service
        serviceOfferingRepository.delete(serviceOffering);

        // Return updated business
        business.setServiceOfferings(business.getServiceOfferings().stream().filter(s -> !s.getId().equals(serviceId)).toList());
        return business;

    }

}
