package net.tylerwade.quickbook.service;

import jakarta.servlet.http.Cookie;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

@Service
public interface TokenService {

    String generateToken(Authentication authentication);

    Cookie generateAuthTokenCookie(Authentication authentication);

    Cookie generateLogoutCookie();
}
