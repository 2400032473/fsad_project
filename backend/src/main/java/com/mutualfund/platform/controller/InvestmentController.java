package com.mutualfund.platform.controller;

import com.mutualfund.platform.dto.ApiResponse;
import com.mutualfund.platform.dto.InvestmentRequest;
import com.mutualfund.platform.model.Investment;
import com.mutualfund.platform.service.InvestmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/investments")
@CrossOrigin
public class InvestmentController {

    @Autowired
    private InvestmentService investmentService;

    @PostMapping
    public ResponseEntity<?> createInvestment(@RequestBody InvestmentRequest request,
                                               Authentication authentication) {
        try {
            Investment investment = investmentService.createInvestment(
                    authentication.getName(), request);
            return ResponseEntity.status(HttpStatus.CREATED).body(investment);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest()
                    .body(new ApiResponse(false, e.getMessage()));
        }
    }

    @GetMapping
    public ResponseEntity<List<Investment>> getMyInvestments(Authentication authentication) {
        return ResponseEntity.ok(
                investmentService.getUserInvestments(authentication.getName()));
    }

    @GetMapping("/active")
    public ResponseEntity<List<Investment>> getMyActiveInvestments(Authentication authentication) {
        return ResponseEntity.ok(
                investmentService.getUserActiveInvestments(authentication.getName()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getInvestmentById(@PathVariable Long id) {
        return investmentService.getInvestmentById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}/redeem")
    public ResponseEntity<?> redeemInvestment(@PathVariable Long id,
                                               Authentication authentication) {
        try {
            Investment investment = investmentService.redeemInvestment(id, authentication.getName());
            return ResponseEntity.ok(investment);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest()
                    .body(new ApiResponse(false, e.getMessage()));
        }
    }

    @GetMapping("/portfolio")
    public ResponseEntity<Map<String, Object>> getPortfolioSummary(Authentication authentication) {
        return ResponseEntity.ok(
                investmentService.getPortfolioSummary(authentication.getName()));
    }

    @GetMapping("/all")
    public ResponseEntity<List<Investment>> getAllInvestments() {
        return ResponseEntity.ok(investmentService.getAllInvestments());
    }

    @GetMapping("/stats")
    public ResponseEntity<Map<String, Object>> getPlatformStats() {
        return ResponseEntity.ok(investmentService.getPlatformStats());
    }
}
