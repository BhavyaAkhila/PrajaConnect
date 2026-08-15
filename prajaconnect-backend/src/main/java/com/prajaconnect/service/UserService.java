package com.prajaconnect.service;

import com.prajaconnect.dto.LoginRequest;
import com.prajaconnect.dto.SignupRequest;
import com.prajaconnect.dto.JwtResponse;
import com.prajaconnect.dto.UserManagementResponse;
import com.prajaconnect.model.Role;
import com.prajaconnect.model.User;
import com.prajaconnect.repository.UserRepository;
import com.prajaconnect.security.jwt.JwtUtils;
import com.prajaconnect.security.services.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder encoder;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private FileStorageService fileStorageService;

    public void registerUser(SignupRequest signUpRequest) {
        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            throw new RuntimeException("Error: Email is already in use!");
        }

        User user = new User();
        user.setName(signUpRequest.getName());
        user.setEmail(signUpRequest.getEmail());
        user.setPassword(encoder.encode(signUpRequest.getPassword()));
        user.setPhone(signUpRequest.getPhone());
        user.setLocation(signUpRequest.getLocation());
        
        String strRole = signUpRequest.getRole();
        if ("politician".equalsIgnoreCase(strRole)) {
            user.setRole(Role.POLITICIAN);
        } else if ("moderator".equalsIgnoreCase(strRole)) {
            user.setRole(Role.MODERATOR);
        } else if ("admin".equalsIgnoreCase(strRole)) {
            user.setRole(Role.ADMIN);
        } else {
            user.setRole(Role.CITIZEN);
        }
        
        userRepository.save(user);
    }

    public JwtResponse loginUser(LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();     
        User user = userRepository.findByEmail(userDetails.getEmail()).orElseThrow();
        
        return new JwtResponse(jwt, userDetails.getId(), userDetails.getName(), userDetails.getEmail(), user.getRole().name());
    }

    public User updateProfile(Long userId, String name, String phone, String location, MultipartFile profilePhoto) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        
        if (name != null) user.setName(name);
        if (phone != null) user.setPhone(phone);
        if (location != null) user.setLocation(location);
        
        if (profilePhoto != null && !profilePhoto.isEmpty()) {
            String fileName = fileStorageService.storeFile(profilePhoto);
            user.setProfilePhoto(fileName);
        }
        
        return userRepository.save(user);
    }
    
    public User getUserProfile(Long userId) {
        return userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
    }

    public List<UserManagementResponse> getAllUsers(String requesterEmail) {
        User requester = userRepository.findByEmail(requesterEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (requester.getRole() != Role.ADMIN && requester.getRole() != Role.MODERATOR) {
            throw new RuntimeException("You are not allowed to view users");
        }

        return userRepository.findAll()
                .stream()
                .sorted(Comparator.comparing(User::getCreatedAt, Comparator.nullsLast(Comparator.reverseOrder())))
                .map(this::mapUserManagement)
                .collect(Collectors.toList());
    }

    private UserManagementResponse mapUserManagement(User user) {
        return new UserManagementResponse(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getRole() != null ? user.getRole().name() : null,
                user.getPhone(),
                user.getLocation(),
                user.getCreatedAt()
        );
    }
}
