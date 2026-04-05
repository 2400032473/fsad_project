package com.mutualfund.platform.service;

import com.mutualfund.platform.model.Report;
import com.mutualfund.platform.model.User;
import com.mutualfund.platform.repository.ReportRepository;
import com.mutualfund.platform.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ReportService {

    @Autowired
    private ReportRepository reportRepository;

    @Autowired
    private UserRepository userRepository;

    public List<Report> getAllReports() {
        return reportRepository.findAllByOrderByGeneratedAtDesc();
    }

    public Optional<Report> getReportById(Long id) {
        return reportRepository.findById(id);
    }

    public Report createReport(Report report, String username) {
        User analyst = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        report.setGeneratedBy(analyst);
        return reportRepository.save(report);
    }

    public Report updateReport(Long id, Report updatedReport) {
        return reportRepository.findById(id)
                .map(report -> {
                    if (updatedReport.getTitle() != null) report.setTitle(updatedReport.getTitle());
                    if (updatedReport.getDescription() != null) report.setDescription(updatedReport.getDescription());
                    if (updatedReport.getReportData() != null) report.setReportData(updatedReport.getReportData());
                    if (updatedReport.getReportType() != null) report.setReportType(updatedReport.getReportType());
                    return reportRepository.save(report);
                })
                .orElseThrow(() -> new RuntimeException("Report not found with id: " + id));
    }

    public void deleteReport(Long id) {
        if (!reportRepository.existsById(id)) {
            throw new RuntimeException("Report not found with id: " + id);
        }
        reportRepository.deleteById(id);
    }

    public List<Report> getReportsByType(String type) {
        return reportRepository.findByReportType(type);
    }
}
