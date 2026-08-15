package com.prajaconnect.controller;

import com.prajaconnect.dto.IssueRequest;
import com.prajaconnect.dto.IssueReplyRequest;
import com.prajaconnect.dto.IssueReplyResponse;
import com.prajaconnect.dto.IssueResponse;
import com.prajaconnect.service.IssueService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/issues")
public class IssueController {

    @Autowired
    private IssueService issueService;

    @PostMapping
    public ResponseEntity<IssueResponse> createIssue(@Valid @RequestBody IssueRequest issueRequest, Authentication authentication) {
        String email = authentication.getName();
        return ResponseEntity.ok(issueService.createIssue(issueRequest, email));
    }

    @GetMapping
    public ResponseEntity<List<IssueResponse>> getAllIssues() {
        return ResponseEntity.ok(issueService.getAllIssues());
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<IssueResponse> updateStatus(@PathVariable Long id,
                                                      @RequestBody java.util.Map<String, String> body,
                                                      Authentication authentication) {
        String status = body.get("status");
        return ResponseEntity.ok(issueService.updateIssueStatus(id, status, authentication.getName()));
    }

    @PostMapping("/{id}/replies")
    public ResponseEntity<IssueReplyResponse> addReply(@PathVariable Long id,
                                                       @Valid @RequestBody IssueReplyRequest request,
                                                       Authentication authentication) {
        return ResponseEntity.ok(issueService.addReply(id, request, authentication.getName()));
    }
}
