package com.mutualfund.platform.service;

import com.mutualfund.platform.dto.InvestmentRequest;
import com.mutualfund.platform.model.*;
import com.mutualfund.platform.repository.InvestmentRepository;
import com.mutualfund.platform.repository.MutualFundRepository;
import com.mutualfund.platform.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class InvestmentService {

    @Autowired
    private InvestmentRepository investmentRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private MutualFundRepository mutualFundRepository;

    public Investment createInvestment(String username, InvestmentRequest request) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        MutualFund fund = mutualFundRepository.findById(request.getFundId())
                .orElseThrow(() -> new RuntimeException("Mutual Fund not found"));

        if (request.getAmount() < fund.getMinInvestment()) {
            throw new RuntimeException("Minimum investment amount is ₹" + fund.getMinInvestment());
        }

        InvestmentType type = InvestmentType.valueOf(request.getInvestmentType().toUpperCase());

        double units = request.getAmount() / fund.getNavValue();

        Investment investment = Investment.builder()
                .user(user)
                .mutualFund(fund)
                .amount(request.getAmount())
                .units(units)
                .investmentDate(LocalDate.now())
                .investmentType(type)
                .status(InvestmentStatus.ACTIVE)
                .currentValue(request.getAmount())
                .sipAmount(request.getSipAmount())
                .build();

        return investmentRepository.save(investment);
    }

    public List<Investment> getUserInvestments(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return investmentRepository.findByUserId(user.getId());
    }

    public List<Investment> getUserActiveInvestments(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return investmentRepository.findByUserIdAndStatus(user.getId(), InvestmentStatus.ACTIVE);
    }

    public Optional<Investment> getInvestmentById(Long id) {
        return investmentRepository.findById(id);
    }

    public Investment redeemInvestment(Long id, String username) {
        Investment investment = investmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Investment not found"));

        if (!investment.getUser().getUsername().equals(username)) {
            throw new RuntimeException("Unauthorized to redeem this investment");
        }

        investment.setStatus(InvestmentStatus.REDEEMED);
        return investmentRepository.save(investment);
    }

    public Map<String, Object> getPortfolioSummary(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Map<String, Object> summary = new HashMap<>();
        Double totalInvested = investmentRepository.getTotalInvestmentByUserId(user.getId());
        Double totalCurrentValue = investmentRepository.getTotalCurrentValueByUserId(user.getId());

        summary.put("totalInvested", totalInvested != null ? totalInvested : 0.0);
        summary.put("currentValue", totalCurrentValue != null ? totalCurrentValue : 0.0);
        summary.put("totalReturns", (totalCurrentValue != null ? totalCurrentValue : 0.0) - (totalInvested != null ? totalInvested : 0.0));

        List<Investment> activeInvestments = investmentRepository.findByUserIdAndStatus(user.getId(), InvestmentStatus.ACTIVE);
        summary.put("activeInvestments", activeInvestments.size());

        return summary;
    }

    public List<Investment> getAllInvestments() {
        return investmentRepository.findAll();
    }

    public Map<String, Object> getPlatformStats() {
        Map<String, Object> stats = new HashMap<>();
        stats.put("totalActiveInvestments", investmentRepository.countActiveInvestments());
        stats.put("totalPlatformInvestment", investmentRepository.getTotalPlatformInvestment());
        stats.put("totalInvestments", investmentRepository.count());
        return stats;
    }
}
