package com.prajaconnect.dto;

import java.time.LocalDateTime;
import java.util.List;

public class IssueResponse {
    private Long id;
    private String title;
    private String description;
    private String category;
    private String status;
    private UserSummaryResponse author;
    private String image;
    private LocalDateTime createdAt;
    private List<IssueReplyResponse> replies;

    public IssueResponse() {}

    public IssueResponse(Long id, String title, String description, String category, String status,
                         UserSummaryResponse author, String image, LocalDateTime createdAt,
                         List<IssueReplyResponse> replies) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.category = category;
        this.status = status;
        this.author = author;
        this.image = image;
        this.createdAt = createdAt;
        this.replies = replies;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public UserSummaryResponse getAuthor() { return author; }
    public void setAuthor(UserSummaryResponse author) { this.author = author; }
    public String getImage() { return image; }
    public void setImage(String image) { this.image = image; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    public List<IssueReplyResponse> getReplies() { return replies; }
    public void setReplies(List<IssueReplyResponse> replies) { this.replies = replies; }
}
