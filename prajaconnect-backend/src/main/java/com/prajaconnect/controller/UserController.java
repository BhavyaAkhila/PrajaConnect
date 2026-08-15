package com.prajaconnect.controller;

import com.prajaconnect.dto.UserManagementResponse;
import com.prajaconnect.model.User;
import com.prajaconnect.security.services.UserDetailsImpl;
import com.prajaconnect.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping
    public ResponseEntity<List<UserManagementResponse>> getUsers(Authentication authentication) {
        return ResponseEntity.ok(userService.getAllUsers(authentication.getName()));
    }

    @GetMapping("/profile")
    public ResponseEntity<User> getProfile(Authentication authentication) {
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        return ResponseEntity.ok(userService.getUserProfile(userDetails.getId()));
    }

    @PutMapping("/profile")
    public ResponseEntity<User> updateProfile(
            Authentication authentication,
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String phone,
            @RequestParam(required = false) String location,
            @RequestParam(required = false) MultipartFile profilePhoto) {
            
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        User updatedUser = userService.updateProfile(userDetails.getId(), name, phone, location, profilePhoto);
        return ResponseEntity.ok(updatedUser);
    }
}
