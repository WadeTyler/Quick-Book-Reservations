package net.tylerwade.quickbook.auth;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import net.tylerwade.quickbook.auth.dto.ChangePasswordRequest;
import net.tylerwade.quickbook.auth.dto.DeleteAccountRequest;
import net.tylerwade.quickbook.auth.token.TokenService;
import net.tylerwade.quickbook.common.APIResponse;
import net.tylerwade.quickbook.auth.dto.SignupRequest;
import net.tylerwade.quickbook.auth.dto.UserDTO;
import net.tylerwade.quickbook.exception.HttpRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import javax.lang.model.type.NullType;

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

        Authentication authentication = new UsernamePasswordAuthenticationToken(user.getUsername(), null, user.getAuthorities());
        Cookie authCookie = tokenService.generateAuthTokenCookie(authentication);
        response.addCookie(authCookie);

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

    @PutMapping("/change-password")
    public ResponseEntity<APIResponse<UserDTO>> changePassword(Authentication authentication, @Valid @RequestBody ChangePasswordRequest changePasswordRequest) throws HttpRequestException {
        UserDTO userDTO = this.userService.changePassword(changePasswordRequest, authentication).toDTO();
        return ResponseEntity.status(HttpStatus.OK).body(new APIResponse<>(true, "Password changed.", userDTO));
    }


    @PostMapping("/delete")
    public ResponseEntity<APIResponse<NullType>> delete(Authentication authentication, @Valid @RequestBody DeleteAccountRequest deleteAccountRequest, HttpServletResponse response) throws HttpRequestException {
        this.userService.delete(deleteAccountRequest, authentication);

        Cookie logoutCookie = this.tokenService.generateLogoutCookie();
        response.addCookie(logoutCookie);

        return ResponseEntity.status(HttpStatus.OK).body(new APIResponse<>(true, "Account deleted successfully.", null));
    }


}
