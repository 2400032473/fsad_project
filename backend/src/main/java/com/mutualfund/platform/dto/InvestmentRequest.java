package com.mutualfund.platform.dto;

public class InvestmentRequest {
    private Long fundId;
    private Double amount;
    private String investmentType;
    private Double sipAmount;

    public InvestmentRequest() {}

    public Long getFundId() { return fundId; }
    public void setFundId(Long fundId) { this.fundId = fundId; }
    public Double getAmount() { return amount; }
    public void setAmount(Double amount) { this.amount = amount; }
    public String getInvestmentType() { return investmentType; }
    public void setInvestmentType(String investmentType) { this.investmentType = investmentType; }
    public Double getSipAmount() { return sipAmount; }
    public void setSipAmount(Double sipAmount) { this.sipAmount = sipAmount; }
}
