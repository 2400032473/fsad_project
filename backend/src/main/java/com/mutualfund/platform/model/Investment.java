package com.mutualfund.platform.model;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "investments")
public class Investment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "fund_id", nullable = false)
    private MutualFund mutualFund;

    @Column(nullable = false)
    private Double amount;

    private Double units;
    private LocalDate investmentDate;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private InvestmentType investmentType;

    @Enumerated(EnumType.STRING)
    private InvestmentStatus status = InvestmentStatus.ACTIVE;

    private Double currentValue;
    private Double sipAmount;

    @Column(updatable = false)
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public Investment() {}

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
        if (investmentDate == null) investmentDate = LocalDate.now();
        if (units == null && mutualFund != null && mutualFund.getNavValue() != null && mutualFund.getNavValue() > 0) {
            units = amount / mutualFund.getNavValue();
        }
        if (currentValue == null) currentValue = amount;
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
    public MutualFund getMutualFund() { return mutualFund; }
    public void setMutualFund(MutualFund mutualFund) { this.mutualFund = mutualFund; }
    public Double getAmount() { return amount; }
    public void setAmount(Double amount) { this.amount = amount; }
    public Double getUnits() { return units; }
    public void setUnits(Double units) { this.units = units; }
    public LocalDate getInvestmentDate() { return investmentDate; }
    public void setInvestmentDate(LocalDate investmentDate) { this.investmentDate = investmentDate; }
    public InvestmentType getInvestmentType() { return investmentType; }
    public void setInvestmentType(InvestmentType investmentType) { this.investmentType = investmentType; }
    public InvestmentStatus getStatus() { return status; }
    public void setStatus(InvestmentStatus status) { this.status = status; }
    public Double getCurrentValue() { return currentValue; }
    public void setCurrentValue(Double currentValue) { this.currentValue = currentValue; }
    public Double getSipAmount() { return sipAmount; }
    public void setSipAmount(Double sipAmount) { this.sipAmount = sipAmount; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }

    // Builder
    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private final Investment i = new Investment();
        public Builder user(User v) { i.user = v; return this; }
        public Builder mutualFund(MutualFund v) { i.mutualFund = v; return this; }
        public Builder amount(Double v) { i.amount = v; return this; }
        public Builder units(Double v) { i.units = v; return this; }
        public Builder investmentDate(LocalDate v) { i.investmentDate = v; return this; }
        public Builder investmentType(InvestmentType v) { i.investmentType = v; return this; }
        public Builder status(InvestmentStatus v) { i.status = v; return this; }
        public Builder currentValue(Double v) { i.currentValue = v; return this; }
        public Builder sipAmount(Double v) { i.sipAmount = v; return this; }
        public Investment build() { return i; }
    }
}
