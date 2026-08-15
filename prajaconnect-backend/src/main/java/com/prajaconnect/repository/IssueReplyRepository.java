package com.prajaconnect.repository;

import com.prajaconnect.model.IssueReply;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IssueReplyRepository extends JpaRepository<IssueReply, Long> {
}
