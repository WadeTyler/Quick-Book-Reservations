package net.tylerwade.quickbook.service;

import net.tylerwade.quickbook.dto.business.CreateBusinessRequest;
import net.tylerwade.quickbook.exception.HttpRequestException;
import net.tylerwade.quickbook.model.Business;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface BusinessService {

    // Get All Businesses that user is owner or staff of
    List<Business> findAllByOwnerOrStaff(Authentication authentication) throws HttpRequestException;

    // Find one by id
    Business findByIdAndOwnerOrStaff(String businessId, Authentication authentication) throws HttpRequestException;

    // Create new Business
    Business create(CreateBusinessRequest createBusinessRequest, Authentication authentication) throws HttpRequestException;
}
