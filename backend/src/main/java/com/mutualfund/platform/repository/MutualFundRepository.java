package com.mutualfund.platform.repository;

import com.mutualfund.platform.model.FundCategory;
import com.mutualfund.platform.model.MutualFund;
import com.mutualfund.platform.model.RiskLevel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MutualFundRepository extends JpaRepository<MutualFund, Long> {
    List<MutualFund> findByCategory(FundCategory category);
    List<MutualFund> findByRiskLevel(RiskLevel riskLevel);
    List<MutualFund> findByFundHouse(String fundHouse);
    List<MutualFund> findByNameContainingIgnoreCase(String name);
    List<MutualFund> findByCategoryAndRiskLevel(FundCategory category, RiskLevel riskLevel);

    @Query("SELECT f FROM MutualFund f WHERE f.id IN :ids")
    List<MutualFund> findByIds(@Param("ids") List<Long> ids);

    @Query("SELECT DISTINCT f.fundHouse FROM MutualFund f")
    List<String> findDistinctFundHouses();

    List<MutualFund> findByRatingGreaterThanEqual(Double rating);
}
