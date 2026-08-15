package com.prajaconnect.controller;

import com.prajaconnect.dto.MessageResponse;
import com.prajaconnect.dto.UpdateRequest;
import com.prajaconnect.model.Update;
import com.prajaconnect.service.UpdateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/updates")
public class UpdateController {

    @Autowired
    private UpdateService updateService;

    @PostMapping
    public ResponseEntity<?> createUpdate(@Valid @RequestBody UpdateRequest request, Authentication authentication) {
        String email = authentication.getName();
        updateService.createUpdate(request, email);
        return ResponseEntity.ok(new MessageResponse("Update posted successfully!"));
    }

    @GetMapping
    public ResponseEntity<List<Update>> getAllUpdates() {
        return ResponseEntity.ok(updateService.getAllUpdates());
    }
}
