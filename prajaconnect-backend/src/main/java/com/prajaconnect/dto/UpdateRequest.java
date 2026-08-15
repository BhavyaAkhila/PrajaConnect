package com.prajaconnect.dto;

import jakarta.validation.constraints.NotBlank;

public class UpdateRequest {
    @NotBlank
    private String title;
    @NotBlank
    private String body;
    private String image;

    public UpdateRequest() {}
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getBody() { return body; }
    public void setBody(String body) { this.body = body; }
    public String getImage() { return image; }
    public void setImage(String image) { this.image = image; }
}
