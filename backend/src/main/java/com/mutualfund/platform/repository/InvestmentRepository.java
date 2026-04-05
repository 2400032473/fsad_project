package com.mutualfund.platform.repository;

import com.mutualfund.platform.model.Investment;
import com.mutualfund.platform.model.InvestmentStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InvestmentRepository extends JpaRepository<Investment, Long> {
    List<Investment> findByUserId(Long userId);
    List<Investment> findByUserIdAndStatus(Long userId, InvestmentStatus status);
    List<Investment> findByMutualFundId(Long fundId);

    @Query("SELECT SUM(i.amount) FROM Investment i WHERE i.user.id = :userId AND i.status = 'ACTIVE'")
    Double getTotalInvestmentByUserId(@Param("userId") Long userId);

    @Query("SELECT SUM(i.currentValue) FROM Investment i WHERE i.user.id = :userId AND i.status = 'ACTIVE'")
    Double getTotalCurrentValueByUserId(@Param("userId") Long userId);

    @Query("SELECT COUNT(i) FROM Investment i WHERE i.status = 'ACTIVE'")
    Long countActiveInvestments();

    @Query("SELECT SUM(i.amount) FROM Investment i WHERE i.status = 'ACTIVE'")
    Double getTotalPlatformInvestment();
}
