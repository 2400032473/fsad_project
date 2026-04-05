package com.mutualfund.platform.controller;

import com.mutualfund.platform.dto.ApiResponse;
import com.mutualfund.platform.model.FundCategory;
import com.mutualfund.platform.model.MutualFund;
import com.mutualfund.platform.model.RiskLevel;
import com.mutualfund.platform.service.MutualFundService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/funds")
@CrossOrigin
public class MutualFundController {

    @Autowired
    private MutualFundService mutualFundService;

    @GetMapping
    public ResponseEntity<List<MutualFund>> getAllFunds() {
        return ResponseEntity.ok(mutualFundService.getAllFunds());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getFundById(@PathVariable Long id) {
        return mutualFundService.getFundById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<?> createFund(@RequestBody MutualFund fund) {
        try {
            MutualFund created = mutualFundService.createFund(fund);
            return ResponseEntity.status(HttpStatus.CREATED).body(created);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest()
                    .body(new ApiResponse(false, e.getMessage()));
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateFund(@PathVariable Long id, @RequestBody MutualFund fund) {
        try {
            MutualFund updated = mutualFundService.updateFund(id, fund);
            return ResponseEntity.ok(updated);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest()
                    .body(new ApiResponse(false, e.getMessage()));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteFund(@PathVariable Long id) {
        try {
            mutualFundService.deleteFund(id);
            return ResponseEntity.ok(new ApiResponse(true, "Fund deleted successfully"));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest()
                    .body(new ApiResponse(false, e.getMessage()));
        }
    }

    @GetMapping("/category/{category}")
    public ResponseEntity<?> getFundsByCategory(@PathVariable String category) {
        try {
            FundCategory cat = FundCategory.valueOf(category.toUpperCase());
            return ResponseEntity.ok(mutualFundService.getFundsByCategory(cat));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest()
                    .body(new ApiResponse(false, "Invalid category"));
        }
    }

    @GetMapping("/risk/{riskLevel}")
    public ResponseEntity<?> getFundsByRiskLevel(@PathVariable String riskLevel) {
        try {
            RiskLevel risk = RiskLevel.valueOf(riskLevel.toUpperCase());
            return ResponseEntity.ok(mutualFundService.getFundsByRiskLevel(risk));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest()
                    .body(new ApiResponse(false, "Invalid risk level"));
        }
    }

    @GetMapping("/search")
    public ResponseEntity<List<MutualFund>> searchFunds(@RequestParam String query) {
        return ResponseEntity.ok(mutualFundService.searchFunds(query));
    }

    @GetMapping("/compare")
    public ResponseEntity<List<MutualFund>> compareFunds(@RequestParam String ids) {
        List<Long> fundIds = Arrays.stream(ids.split(","))
                .map(String::trim)
                .map(Long::parseLong)
                .collect(Collectors.toList());
        return ResponseEntity.ok(mutualFundService.compareFunds(fundIds));
    }

    @GetMapping("/houses")
    public ResponseEntity<List<String>> getFundHouses() {
        return ResponseEntity.ok(mutualFundService.getAllFundHouses());
    }

    @GetMapping("/top-rated")
    public ResponseEntity<List<MutualFund>> getTopRated(
            @RequestParam(defaultValue = "4.0") Double minRating) {
        return ResponseEntity.ok(mutualFundService.getTopRatedFunds(minRating));
    }
}
