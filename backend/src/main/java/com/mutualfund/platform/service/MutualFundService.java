package com.mutualfund.platform.service;

import com.mutualfund.platform.model.FundCategory;
import com.mutualfund.platform.model.MutualFund;
import com.mutualfund.platform.model.RiskLevel;
import com.mutualfund.platform.repository.MutualFundRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MutualFundService {

    @Autowired
    private MutualFundRepository mutualFundRepository;

    public List<MutualFund> getAllFunds() {
        return mutualFundRepository.findAll();
    }

    public Optional<MutualFund> getFundById(Long id) {
        return mutualFundRepository.findById(id);
    }

    public MutualFund createFund(MutualFund fund) {
        return mutualFundRepository.save(fund);
    }

    public MutualFund updateFund(Long id, MutualFund updatedFund) {
        return mutualFundRepository.findById(id)
                .map(fund -> {
                    if (updatedFund.getName() != null) fund.setName(updatedFund.getName());
                    if (updatedFund.getCategory() != null) fund.setCategory(updatedFund.getCategory());
                    if (updatedFund.getFundHouse() != null) fund.setFundHouse(updatedFund.getFundHouse());
                    if (updatedFund.getNavValue() != null) fund.setNavValue(updatedFund.getNavValue());
                    if (updatedFund.getExpenseRatio() != null) fund.setExpenseRatio(updatedFund.getExpenseRatio());
                    if (updatedFund.getRiskLevel() != null) fund.setRiskLevel(updatedFund.getRiskLevel());
                    if (updatedFund.getMinInvestment() != null) fund.setMinInvestment(updatedFund.getMinInvestment());
                    if (updatedFund.getReturns1Year() != null) fund.setReturns1Year(updatedFund.getReturns1Year());
                    if (updatedFund.getReturns3Year() != null) fund.setReturns3Year(updatedFund.getReturns3Year());
                    if (updatedFund.getReturns5Year() != null) fund.setReturns5Year(updatedFund.getReturns5Year());
                    if (updatedFund.getFundSize() != null) fund.setFundSize(updatedFund.getFundSize());
                    if (updatedFund.getDescription() != null) fund.setDescription(updatedFund.getDescription());
                    if (updatedFund.getFundManager() != null) fund.setFundManager(updatedFund.getFundManager());
                    if (updatedFund.getRating() != null) fund.setRating(updatedFund.getRating());
                    return mutualFundRepository.save(fund);
                })
                .orElseThrow(() -> new RuntimeException("Mutual Fund not found with id: " + id));
    }

    public void deleteFund(Long id) {
        if (!mutualFundRepository.existsById(id)) {
            throw new RuntimeException("Mutual Fund not found with id: " + id);
        }
        mutualFundRepository.deleteById(id);
    }

    public List<MutualFund> getFundsByCategory(FundCategory category) {
        return mutualFundRepository.findByCategory(category);
    }

    public List<MutualFund> getFundsByRiskLevel(RiskLevel riskLevel) {
        return mutualFundRepository.findByRiskLevel(riskLevel);
    }

    public List<MutualFund> searchFunds(String query) {
        return mutualFundRepository.findByNameContainingIgnoreCase(query);
    }

    public List<MutualFund> compareFunds(List<Long> ids) {
        return mutualFundRepository.findByIds(ids);
    }

    public List<String> getAllFundHouses() {
        return mutualFundRepository.findDistinctFundHouses();
    }

    public List<MutualFund> getTopRatedFunds(Double minRating) {
        return mutualFundRepository.findByRatingGreaterThanEqual(minRating);
    }

    public long getFundCount() {
        return mutualFundRepository.count();
    }
}
