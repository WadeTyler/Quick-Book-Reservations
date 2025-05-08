package net.tylerwade.quickbook.business;

import net.tylerwade.quickbook.business.dto.CreateBusinessRequest;
import net.tylerwade.quickbook.business.dto.StaffManagementDTO;
import net.tylerwade.quickbook.business.dto.UpdateBusinessDetailsRequest;
import net.tylerwade.quickbook.business.dto.UpdateBusinessImageRequest;
import net.tylerwade.quickbook.exception.HttpRequestException;
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


    Business findById(String businessId) throws HttpRequestException;

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

}