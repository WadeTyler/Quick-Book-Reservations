package net.tylerwade.quickbook.service;

import net.tylerwade.quickbook.dto.auth.SignupRequest;
import net.tylerwade.quickbook.dto.auth.UserDTO;
import net.tylerwade.quickbook.exception.HttpRequestException;
import net.tylerwade.quickbook.model.User;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public interface UserService extends UserDetailsService {

    User loadUserByUsername(String username) throws UsernameNotFoundException;

    User signup(SignupRequest signupRequest) throws HttpRequestException;

    default UserDTO convertToDTO(User user) {
        return new UserDTO(user.getId(), user.getUsername());
    }

    default User getUser(Authentication authentication) {
        return this.loadUserByUsername(authentication.getName());
    }

}
