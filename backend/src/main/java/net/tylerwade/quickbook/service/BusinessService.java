package net.tylerwade.quickbook.service;

import net.tylerwade.quickbook.dto.business.*;
import net.tylerwade.quickbook.dto.reservation.CreateReservationRequest;
import net.tylerwade.quickbook.dto.reservation.ReservationDTO;
import net.tylerwade.quickbook.dto.service.ManageServiceOfferingRequest;
import net.tylerwade.quickbook.dto.service.ServiceOfferingDTO;
import net.tylerwade.quickbook.exception.HttpRequestException;
import net.tylerwade.quickbook.model.Business;
import net.tylerwade.quickbook.model.Reservation;
import net.tylerwade.quickbook.model.ServiceOffering;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

/**
 * Service interface for managing businesses and their related operations.
 */
@Service
public interface BusinessService {

    /**
     * Retrieves all businesses
     *
     * @return all businesses
     */
    List<Business> findAll();

    /**
     * Retrieves a business by its ID and the authenticated owner.
     *
     * @param businessId The ID of the business.
     * @param authentication The authentication object of the current user.
     * @return The business entity.
     * @throws HttpRequestException If the business is not found or the user is unauthorized.
     */
    Business findByIdAndOwner(String businessId, Authentication authentication) throws HttpRequestException;

    /**
     * Retrieves all businesses where the user is either the owner or a staff member.
     *
     * @param authentication The authentication object of the current user.
     * @return A list of businesses.
     */
    List<Business> findAllByOwnerOrStaff(Authentication authentication);

    /**
     * Retrieves a business by its ID where the user is either the owner or a staff member.
     *
     * @param businessId The ID of the business.
     * @param authentication The authentication object of the current user.
     * @return The business entity.
     * @throws HttpRequestException If the business is not found or the user is unauthorized.
     */
    Business findByIdAndOwnerOrStaff(String businessId, Authentication authentication) throws HttpRequestException;

    /**
     * Creates a new business.
     *
     * @param createBusinessRequest The request object containing business details.
     * @param authentication The authentication object of the current user.
     * @return The created business entity.
     * @throws IOException If an error occurs during creation.
     */
    Business create(CreateBusinessRequest createBusinessRequest, Authentication authentication) throws IOException;

    /**
     * Adds a staff member to a business.
     *
     * @param businessId The ID of the business.
     * @param staffManagementDTO The staff member details.
     * @param authentication The authentication object of the current user.
     * @return The updated business entity.
     * @throws HttpRequestException If the business is not found or the user is unauthorized.
     */
    Business addStaffMember(String businessId, StaffManagementDTO staffManagementDTO, Authentication authentication) throws HttpRequestException;

    /**
     * Removes a staff member from a business.
     *
     * @param businessId The ID of the business.
     * @param staffId The ID of the staff member to remove.
     * @param authentication The authentication object of the current user.
     * @return The updated business entity.
     * @throws HttpRequestException If the business or staff member is not found or the user is unauthorized.
     */
    Business removeStaffMember(String businessId, String staffId, Authentication authentication) throws HttpRequestException;

    /**
     * Updates the details of a business.
     *
     * @param businessId The ID of the business.
     * @param updateBusinessDetailsRequest The request object containing updated business details.
     * @param authentication The authentication object of the current user.
     * @return The updated business entity.
     * @throws HttpRequestException If the business is not found or the user is unauthorized.
     */
    Business updatedBusinessDetails(String businessId, UpdateBusinessDetailsRequest updateBusinessDetailsRequest, Authentication authentication) throws HttpRequestException;

    /**
     * Updates the image of a business.
     *
     * @param businessId The ID of the business.
     * @param updateBusinessImageRequest The request object containing the new image details.
     * @param authentication The authentication object of the current user.
     * @return The updated business entity.
     * @throws IOException If an error occurs during the update.
     */
    Business updateBusinessImage(String businessId, UpdateBusinessImageRequest updateBusinessImageRequest, Authentication authentication) throws IOException;

    /**
     * Removes the image of a business.
     *
     * @param businessId The ID of the business.
     * @param authentication The authentication object of the current user.
     * @return The updated business entity.
     * @throws HttpRequestException If the business is not found or the user is unauthorized.
     */
    Business removeBusinessImage(String businessId, Authentication authentication) throws HttpRequestException;

    /**
     * Deletes a business.
     *
     * @param businessId The ID of the business.
     * @param authentication The authentication object of the current user.
     * @throws HttpRequestException If the business is not found or the user is unauthorized.
     */
    void deleteBusiness(String businessId, Authentication authentication) throws HttpRequestException;

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

    /**
     * Converts a business entity to a ManagedBusinessDTO.
     *
     * @param business The business entity.
     * @return The ManagedBusinessDTO representation.
     */
    ManagedBusinessDTO convertToManagedBusinessDTO(Business business);

    /**
     * Converts a business entity to a BusinessDTO.
     *
     * @param business The business entity.
     * @return The BusinessDTO representation.
     */
    BusinessDTO convertToDTO(Business business);

    /**
     * Converts a service entity to a ServiceDTO.
     *
     * @param serviceOffering The service entity.
     * @return The ServiceDTO representation.
     */
    ServiceOfferingDTO convertToServiceDTO(ServiceOffering serviceOffering);

    /**
     * Converts a reservation entity to a ReservationDTO.
     * @param reservation The reservation entity.
     * @return The ReservationDTO representation.
     */
    ReservationDTO convertToReservationDTO(Reservation reservation);

    /**
     * Create a reservation
     * @param businessId The business id
     * @param serviceId The service id
     * @param createReservationRequest The request object containing the reservation details
     * @return the newly created reservation
     */
    Reservation createReservation(String businessId, Long serviceId, CreateReservationRequest createReservationRequest) throws HttpRequestException;


}