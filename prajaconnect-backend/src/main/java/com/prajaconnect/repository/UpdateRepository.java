package com.prajaconnect.repository;

import com.prajaconnect.model.Update;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface UpdateRepository extends JpaRepository<Update, Long> {
    List<Update> findAllByOrderByCreatedAtDesc();
    List<Update> findByAuthorIdOrderByCreatedAtDesc(Long authorId);
}
