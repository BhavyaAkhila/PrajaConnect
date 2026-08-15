package com.prajaconnect.dto;

import java.time.LocalDateTime;

public class IssueReplyResponse {
    private Long id;
    private String message;
    private UserSummaryResponse author;
    private LocalDateTime createdAt;

    public IssueReplyResponse() {}

    public IssueReplyResponse(Long id, String message, UserSummaryResponse author, LocalDateTime createdAt) {
        this.id = id;
        this.message = message;
        this.author = author;
        this.createdAt = createdAt;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
    public UserSummaryResponse getAuthor() { return author; }
    public void setAuthor(UserSummaryResponse author) { this.author = author; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
