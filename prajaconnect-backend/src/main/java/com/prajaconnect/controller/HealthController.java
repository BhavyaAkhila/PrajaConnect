package com.prajaconnect.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.LinkedHashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/health")
public class HealthController {

    private final JdbcTemplate jdbcTemplate;

    public HealthController(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @GetMapping
    public ResponseEntity<Map<String, Object>> health() {
        Map<String, Object> response = new LinkedHashMap<>();
        response.put("status", "UP");
        response.put("application", "prajaconnect");
        response.put("database", checkDatabase());
        return ResponseEntity.ok(response);
    }

    private String checkDatabase() {
        Integer result = jdbcTemplate.queryForObject("SELECT 1", Integer.class);
        return Integer.valueOf(1).equals(result) ? "UP" : "DOWN";
    }
}
