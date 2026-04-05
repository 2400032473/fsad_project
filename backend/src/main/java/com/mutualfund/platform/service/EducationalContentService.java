package com.mutualfund.platform.service;

import com.mutualfund.platform.model.EducationalContent;
import com.mutualfund.platform.model.User;
import com.mutualfund.platform.repository.EducationalContentRepository;
import com.mutualfund.platform.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EducationalContentService {

    @Autowired
    private EducationalContentRepository contentRepository;

    @Autowired
    private UserRepository userRepository;

    public List<EducationalContent> getAllContent() {
        return contentRepository.findByPublishedTrue();
    }

    public List<EducationalContent> getAllContentAdmin() {
        return contentRepository.findAll();
    }

    public Optional<EducationalContent> getContentById(Long id) {
        return contentRepository.findById(id);
    }

    public EducationalContent createContent(EducationalContent content, String username) {
        User author = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        content.setAuthor(author);
        return contentRepository.save(content);
    }

    public EducationalContent updateContent(Long id, EducationalContent updatedContent) {
        return contentRepository.findById(id)
                .map(content -> {
                    if (updatedContent.getTitle() != null) content.setTitle(updatedContent.getTitle());
                    if (updatedContent.getContent() != null) content.setContent(updatedContent.getContent());
                    if (updatedContent.getCategory() != null) content.setCategory(updatedContent.getCategory());
                    if (updatedContent.getTags() != null) content.setTags(updatedContent.getTags());
                    return contentRepository.save(content);
                })
                .orElseThrow(() -> new RuntimeException("Content not found with id: " + id));
    }

    public void deleteContent(Long id) {
        if (!contentRepository.existsById(id)) {
            throw new RuntimeException("Content not found with id: " + id);
        }
        contentRepository.deleteById(id);
    }

    public List<EducationalContent> getContentByCategory(String category) {
        return contentRepository.findByCategory(category);
    }

    public List<EducationalContent> searchContent(String query) {
        return contentRepository.findByTitleContainingIgnoreCase(query);
    }
}
