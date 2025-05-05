package net.tylerwade.quickbook.controller;

import com.nimbusds.jose.proc.SecurityContext;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import net.tylerwade.quickbook.dto.api.APIResponse;
import net.tylerwade.quickbook.dto.auth.SignupRequest;
import net.tylerwade.quickbook.dto.auth.UserDTO;
import net.tylerwade.quickbook.exception.HttpRequestException;
import net.tylerwade.quickbook.model.User;
import net.tylerwade.quickbook.service.TokenService;
import net.tylerwade.quickbook.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserService userService;
    private final TokenService tokenService;

    @Autowired
    public AuthController(UserService userService, TokenService tokenService) {
        this.userService = userService;
        this.tokenService = tokenService;
    }

    // Signup
    @PostMapping("/signup")
    public ResponseEntity<?> signup(@Valid @RequestBody SignupRequest signupRequest, HttpServletResponse response) throws HttpRequestException {
        User user = this.userService.signup(signupRequest);
        UserDTO userDTO = this.userService.convertToDTO(user);

        return ResponseEntity.status(HttpStatus.CREATED).body(new APIResponse<>(true, "Signup successful.", userDTO));
    }

    // Get Token
    @PostMapping("/token")
    public ResponseEntity<?> getToken(Authentication authentication, HttpServletResponse response) {
        Cookie authCookie = tokenService.generateAuthTokenCookie(authentication);

        response.addCookie(authCookie);
        return ResponseEntity.status(HttpStatus.CREATED).body(new APIResponse<>(true, "Token retrieved.", authCookie.getValue()));
    }

    // Get User
    @GetMapping
    public ResponseEntity<?> getUser(Authentication authentication) {
        UserDTO userDTO = this.userService.convertToDTO(
                this.userService.getUser(authentication)
        );
        return ResponseEntity.status(HttpStatus.OK).body(new APIResponse<>(true, "User Retrieved.", userDTO));
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletResponse response) {
        response.addCookie(tokenService.generateLogoutCookie());
        return ResponseEntity.status(HttpStatus.OK).body(new APIResponse<>(true, "Logout Successful.", null));

    }


}
