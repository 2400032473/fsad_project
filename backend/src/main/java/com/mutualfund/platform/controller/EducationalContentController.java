package com.mutualfund.platform.controller;

import com.mutualfund.platform.dto.ApiResponse;
import com.mutualfund.platform.model.EducationalContent;
import com.mutualfund.platform.service.EducationalContentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/content")
@CrossOrigin
public class EducationalContentController {

    @Autowired
    private EducationalContentService contentService;

    @GetMapping
    public ResponseEntity<List<EducationalContent>> getAllContent() {
        return ResponseEntity.ok(contentService.getAllContent());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getContentById(@PathVariable Long id) {
        return contentService.getContentById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<?> createContent(@RequestBody EducationalContent content,
                                            Authentication authentication) {
        try {
            EducationalContent created = contentService.createContent(content, authentication.getName());
            return ResponseEntity.status(HttpStatus.CREATED).body(created);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest()
                    .body(new ApiResponse(false, e.getMessage()));
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateContent(@PathVariable Long id,
                                            @RequestBody EducationalContent content) {
        try {
            EducationalContent updated = contentService.updateContent(id, content);
            return ResponseEntity.ok(updated);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest()
                    .body(new ApiResponse(false, e.getMessage()));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteContent(@PathVariable Long id) {
        try {
            contentService.deleteContent(id);
            return ResponseEntity.ok(new ApiResponse(true, "Content deleted successfully"));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest()
                    .body(new ApiResponse(false, e.getMessage()));
        }
    }

    @GetMapping("/category/{category}")
    public ResponseEntity<List<EducationalContent>> getByCategory(@PathVariable String category) {
        return ResponseEntity.ok(contentService.getContentByCategory(category));
    }

    @GetMapping("/search")
    public ResponseEntity<List<EducationalContent>> searchContent(@RequestParam String query) {
        return ResponseEntity.ok(contentService.searchContent(query));
    }
}
