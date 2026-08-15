package com.prajaconnect.dto;

public class UserSummaryResponse {
    private Long id;
    private String name;
    private String role;
    private String profilePhoto;

    public UserSummaryResponse() {}

    public UserSummaryResponse(Long id, String name, String role, String profilePhoto) {
        this.id = id;
        this.name = name;
        this.role = role;
        this.profilePhoto = profilePhoto;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }
    public String getProfilePhoto() { return profilePhoto; }
    public void setProfilePhoto(String profilePhoto) { this.profilePhoto = profilePhoto; }
}
