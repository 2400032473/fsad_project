package com.mutualfund.platform.repository;

import com.mutualfund.platform.model.EducationalContent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EducationalContentRepository extends JpaRepository<EducationalContent, Long> {
    List<EducationalContent> findByPublishedTrue();
    List<EducationalContent> findByCategory(String category);
    List<EducationalContent> findByAuthorId(Long authorId);
    List<EducationalContent> findByTitleContainingIgnoreCase(String title);
}
