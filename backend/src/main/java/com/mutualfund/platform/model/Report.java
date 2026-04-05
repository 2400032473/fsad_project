package com.mutualfund.platform.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "reports")
public class Report {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(length = 1000)
    private String description;

    private String reportType;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "generated_by")
    private User generatedBy;

    @Column(length = 5000)
    private String reportData;

    @Column(updatable = false)
    private LocalDateTime generatedAt;
    private LocalDateTime updatedAt;

    public Report() {}

    @PrePersist
    protected void onCreate() {
        generatedAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public String getReportType() { return reportType; }
    public void setReportType(String reportType) { this.reportType = reportType; }
    public User getGeneratedBy() { return generatedBy; }
    public void setGeneratedBy(User generatedBy) { this.generatedBy = generatedBy; }
    public String getReportData() { return reportData; }
    public void setReportData(String reportData) { this.reportData = reportData; }
    public LocalDateTime getGeneratedAt() { return generatedAt; }
    public void setGeneratedAt(LocalDateTime generatedAt) { this.generatedAt = generatedAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }

    // Builder
    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private final Report r = new Report();
        public Builder title(String v) { r.title = v; return this; }
        public Builder description(String v) { r.description = v; return this; }
        public Builder reportType(String v) { r.reportType = v; return this; }
        public Builder generatedBy(User v) { r.generatedBy = v; return this; }
        public Builder reportData(String v) { r.reportData = v; return this; }
        public Report build() { return r; }
    }
}
