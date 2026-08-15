package com.prajaconnect.dto;

import jakarta.validation.constraints.NotBlank;

public class IssueReplyRequest {
    @NotBlank
    private String message;

    public IssueReplyRequest() {}

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
}
