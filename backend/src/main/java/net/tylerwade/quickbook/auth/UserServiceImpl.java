package net.tylerwade.quickbook.auth;

import net.tylerwade.quickbook.auth.dto.ChangePasswordRequest;
import net.tylerwade.quickbook.auth.dto.DeleteAccountRequest;
import net.tylerwade.quickbook.auth.dto.SignupRequest;
import net.tylerwade.quickbook.business.UserBusinessCleanupService;
import net.tylerwade.quickbook.exception.HttpRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserBusinessCleanupService userBusinessCleanupService;

    @Autowired
    public UserServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder, UserBusinessCleanupService userBusinessCleanupService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.userBusinessCleanupService = userBusinessCleanupService;
    }

    @Override
    public User findById(String userId) throws HttpRequestException {
        return userRepository.findById(userId)
                .orElseThrow(() -> new HttpRequestException(HttpStatus.NOT_FOUND, "User not found."));
    }

    @Override
    public User loadUserByUsername(String username) throws UsernameNotFoundException {
        return this.userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found."));
    }

    @Override
    public User signup(SignupRequest signupRequest) throws HttpRequestException {
        // Check passwords match
        if (!signupRequest.password().equals(signupRequest.confirmPassword())) {
            throw new HttpRequestException(HttpStatus.BAD_REQUEST, "Passwords must match.");
        }


        // Check if user already exists
        if (this.userRepository.existsByUsernameIgnoreCase(signupRequest.username())) {
            throw new HttpRequestException(HttpStatus.NOT_ACCEPTABLE, "Email already exists.");
        }

        // Create new user
        User user = new User();
        user.setUsername(signupRequest.username());
        user.setFirstName(signupRequest.firstName());
        user.setLastName(signupRequest.lastName());
        user.setPassword(passwordEncoder.encode(signupRequest.password())); // Encode Password

        // Save and return
        userRepository.save(user);

        return user;
    }

    @Override
    public User changePassword(ChangePasswordRequest changePasswordRequest, Authentication authentication) throws HttpRequestException {
        // Check if new passwords match
        if (!changePasswordRequest.newPassword().equals(changePasswordRequest.confirmNewPassword())) {
            throw new HttpRequestException(HttpStatus.BAD_REQUEST, "New Password must match.");
        }

        // Check if newPassword matches currentPassword
        if (changePasswordRequest.newPassword().equals(changePasswordRequest.currentPassword())) {
            throw new HttpRequestException(HttpStatus.BAD_REQUEST, "New Password cannot be the same as Current Password.");
        }

        User user = getUser(authentication);

        // Check if current password matches
        if (!passwordEncoder.matches(changePasswordRequest.currentPassword(), user.getPassword())) {
            throw new HttpRequestException(HttpStatus.BAD_REQUEST, "Current Password is incorrect.");
        }

        // Update and return
        user.setPassword(passwordEncoder.encode(changePasswordRequest.newPassword()));
        return userRepository.save(user);
    }

    @Override
    public void delete(DeleteAccountRequest deleteAccountRequest, Authentication authentication) throws HttpRequestException {
        User authUser = getUser(authentication);

        // Verify password matches
        if (!passwordEncoder.matches(deleteAccountRequest.password(), authUser.getPassword())) {
            throw new HttpRequestException(HttpStatus.BAD_REQUEST, "Password is incorrect.");
        }

        // Remove user from all staffed businesses using cleanup service
        userBusinessCleanupService.removeUserFromAllStaffedBusinesses(authUser);

        // Delete
        userRepository.delete(authUser);
    }

}
