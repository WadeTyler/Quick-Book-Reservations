package net.tylerwade.quickbook.serviceoffering;

import net.tylerwade.quickbook.exception.HttpRequestException;
import net.tylerwade.quickbook.business.Business;
import net.tylerwade.quickbook.serviceoffering.dto.ManageServiceOfferingRequest;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

@Service
public interface ServiceOfferingService {
    /**
     * Creates a new service for a business.
     *
     * @param businessId The ID of the business.
     * @param manageServiceOfferingRequest The request object containing service details.
     * @param authentication The authentication object of the current user.
     * @return The updated business entity.
     * @throws IOException If an error occurs during creation.
     */
    Business createService(String businessId, ManageServiceOfferingRequest manageServiceOfferingRequest, Authentication authentication) throws IOException;

    /**
     * Updates an existing service for a business.
     *
     * @param businessId The ID of the business.
     * @param serviceId The ID of the service to update.
     * @param manageServiceOfferingRequest The request object containing updated service details.
     * @param authentication The authentication object of the current user.
     * @return The updated business entity.
     * @throws IOException If an error occurs during the update.
     */
    Business updateService(String businessId, Long serviceId, ManageServiceOfferingRequest manageServiceOfferingRequest, Authentication authentication) throws IOException;

    /**
     * Deletes a service from a business.
     *
     * @param businessId The ID of the business.
     * @param serviceId The ID of the service to delete.
     * @param authentication The authentication object of the current user.
     * @return The updated business entity.
     * @throws HttpRequestException If the business or service is not found or the user is unauthorized.
     */
    Business deleteService(String businessId, Long serviceId, Authentication authentication) throws HttpRequestException;

    List<ServiceOffering> findAllByPublic(String businessId) throws HttpRequestException;

    ServiceOffering findByIdAndPublic(String businessId, Long serviceId) throws HttpRequestException;
}
