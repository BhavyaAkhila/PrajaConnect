package com.prajaconnect.repository;

import com.prajaconnect.model.Issue;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IssueRepository extends JpaRepository<Issue, Long> {
    @Override
    @EntityGraph(attributePaths = {"author", "replies", "replies.author"})
    java.util.List<Issue> findAll();

    List<Issue> findByStatus(String status);
    List<Issue> findByAuthorId(Long authorId);

    @EntityGraph(attributePaths = {"author", "replies", "replies.author"})
    List<Issue> findAllByOrderByCreatedAtDesc();

    @EntityGraph(attributePaths = {"author", "replies", "replies.author"})
    java.util.Optional<Issue> findById(Long id);
}
