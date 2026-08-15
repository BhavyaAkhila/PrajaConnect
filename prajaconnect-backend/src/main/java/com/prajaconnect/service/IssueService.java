package com.prajaconnect.service;

import com.prajaconnect.dto.IssueRequest;
import com.prajaconnect.dto.IssueReplyRequest;
import com.prajaconnect.dto.IssueReplyResponse;
import com.prajaconnect.dto.IssueResponse;
import com.prajaconnect.dto.UserSummaryResponse;
import com.prajaconnect.model.Issue;
import com.prajaconnect.model.IssueReply;
import com.prajaconnect.model.Role;
import com.prajaconnect.model.User;
import com.prajaconnect.repository.IssueReplyRepository;
import com.prajaconnect.repository.IssueRepository;
import com.prajaconnect.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;

import java.util.List;
import java.util.Locale;
import java.util.stream.Collectors;

@Service
public class IssueService {

    @Autowired
    private IssueRepository issueRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private IssueReplyRepository issueReplyRepository;

    public IssueResponse createIssue(IssueRequest request, String userEmail) {
        User author = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Issue issue = new Issue();
        issue.setTitle(request.getTitle());
        issue.setDescription(request.getDescription());
        issue.setCategory(request.getCategory());
        issue.setImage(request.getImage());
        issue.setAuthor(author);
        issue.setStatus("OPEN");
        return mapIssue(issueRepository.save(issue));
    }

    public List<IssueResponse> getAllIssues() {
        return issueRepository.findAllByOrderByCreatedAtDesc()
                .stream()
                .map(this::mapIssue)
                .collect(Collectors.toList());
    }

    public IssueResponse updateIssueStatus(Long issueId, String newStatus, String userEmail) {
        User actingUser = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!canManageIssueStatus(actingUser)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "You are not allowed to update issue status");
        }

        Issue issue = getIssueOrThrow(issueId);
        issue.setStatus(normalizeStatus(newStatus));
        return mapIssue(issueRepository.save(issue));
    }

    public IssueReplyResponse addReply(Long issueId, IssueReplyRequest request, String userEmail) {
        User author = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Issue issue = getIssueOrThrow(issueId);

        IssueReply reply = new IssueReply();
        reply.setIssue(issue);
        reply.setAuthor(author);
        reply.setMessage(request.getMessage().trim());
        return mapReply(issueReplyRepository.save(reply));
    }
    
    public void deleteIssue(Long issueId) {
        issueRepository.deleteById(issueId);
    }

    private Issue getIssueOrThrow(Long issueId) {
        return issueRepository.findById(issueId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Issue not found"));
    }

    private boolean canManageIssueStatus(User user) {
        return user.getRole() == Role.POLITICIAN || user.getRole() == Role.MODERATOR || user.getRole() == Role.ADMIN;
    }

    private String normalizeStatus(String status) {
        if (status == null || status.isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Status is required");
        }

        String normalized = status.trim().toUpperCase(Locale.ROOT);
        return switch (normalized) {
            case "OPEN", "IN_PROGRESS", "RESOLVED" -> normalized;
            default -> throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Unsupported status");
        };
    }

    private IssueResponse mapIssue(Issue issue) {
        return new IssueResponse(
                issue.getId(),
                issue.getTitle(),
                issue.getDescription(),
                issue.getCategory(),
                issue.getStatus(),
                mapUser(issue.getAuthor()),
                issue.getImage(),
                issue.getCreatedAt(),
                issue.getReplies().stream().map(this::mapReply).collect(Collectors.toList())
        );
    }

    private IssueReplyResponse mapReply(IssueReply reply) {
        return new IssueReplyResponse(
                reply.getId(),
                reply.getMessage(),
                mapUser(reply.getAuthor()),
                reply.getCreatedAt()
        );
    }

    private UserSummaryResponse mapUser(User user) {
        return new UserSummaryResponse(
                user.getId(),
                user.getName(),
                user.getRole() != null ? user.getRole().name() : null,
                user.getProfilePhoto()
        );
    }
}
