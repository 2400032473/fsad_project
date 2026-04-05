package com.mutualfund.platform.repository;

import com.mutualfund.platform.model.Report;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReportRepository extends JpaRepository<Report, Long> {
    List<Report> findByGeneratedById(Long userId);
    List<Report> findByReportType(String reportType);
    List<Report> findAllByOrderByGeneratedAtDesc();
}
