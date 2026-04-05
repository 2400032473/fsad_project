package com.mutualfund.platform.model;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "mutual_funds")
public class MutualFund {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private FundCategory category;

    @Column(nullable = false)
    private String fundHouse;

    private Double navValue;
    private Double expenseRatio;

    @Enumerated(EnumType.STRING)
    private RiskLevel riskLevel;

    private Double minInvestment;
    private Double returns1Year;
    private Double returns3Year;
    private Double returns5Year;
    private Double fundSize;

    @Column(length = 2000)
    private String description;

    private String fundManager;
    private LocalDate launchDate;
    private Double rating;

    @Column(updatable = false)
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public MutualFund() {}

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public FundCategory getCategory() { return category; }
    public void setCategory(FundCategory category) { this.category = category; }
    public String getFundHouse() { return fundHouse; }
    public void setFundHouse(String fundHouse) { this.fundHouse = fundHouse; }
    public Double getNavValue() { return navValue; }
    public void setNavValue(Double navValue) { this.navValue = navValue; }
    public Double getExpenseRatio() { return expenseRatio; }
    public void setExpenseRatio(Double expenseRatio) { this.expenseRatio = expenseRatio; }
    public RiskLevel getRiskLevel() { return riskLevel; }
    public void setRiskLevel(RiskLevel riskLevel) { this.riskLevel = riskLevel; }
    public Double getMinInvestment() { return minInvestment; }
    public void setMinInvestment(Double minInvestment) { this.minInvestment = minInvestment; }
    public Double getReturns1Year() { return returns1Year; }
    public void setReturns1Year(Double returns1Year) { this.returns1Year = returns1Year; }
    public Double getReturns3Year() { return returns3Year; }
    public void setReturns3Year(Double returns3Year) { this.returns3Year = returns3Year; }
    public Double getReturns5Year() { return returns5Year; }
    public void setReturns5Year(Double returns5Year) { this.returns5Year = returns5Year; }
    public Double getFundSize() { return fundSize; }
    public void setFundSize(Double fundSize) { this.fundSize = fundSize; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public String getFundManager() { return fundManager; }
    public void setFundManager(String fundManager) { this.fundManager = fundManager; }
    public LocalDate getLaunchDate() { return launchDate; }
    public void setLaunchDate(LocalDate launchDate) { this.launchDate = launchDate; }
    public Double getRating() { return rating; }
    public void setRating(Double rating) { this.rating = rating; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }

    // Builder
    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private final MutualFund f = new MutualFund();
        public Builder name(String v) { f.name = v; return this; }
        public Builder category(FundCategory v) { f.category = v; return this; }
        public Builder fundHouse(String v) { f.fundHouse = v; return this; }
        public Builder navValue(Double v) { f.navValue = v; return this; }
        public Builder expenseRatio(Double v) { f.expenseRatio = v; return this; }
        public Builder riskLevel(RiskLevel v) { f.riskLevel = v; return this; }
        public Builder minInvestment(Double v) { f.minInvestment = v; return this; }
        public Builder returns1Year(Double v) { f.returns1Year = v; return this; }
        public Builder returns3Year(Double v) { f.returns3Year = v; return this; }
        public Builder returns5Year(Double v) { f.returns5Year = v; return this; }
        public Builder fundSize(Double v) { f.fundSize = v; return this; }
        public Builder description(String v) { f.description = v; return this; }
        public Builder fundManager(String v) { f.fundManager = v; return this; }
        public Builder launchDate(LocalDate v) { f.launchDate = v; return this; }
        public Builder rating(Double v) { f.rating = v; return this; }
        public MutualFund build() { return f; }
    }
}
