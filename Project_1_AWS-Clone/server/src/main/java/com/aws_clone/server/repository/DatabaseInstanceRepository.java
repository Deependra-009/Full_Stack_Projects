package com.aws_clone.server.repository;

import com.aws_clone.server.entity.DatabaseInstance;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DatabaseInstanceRepository extends JpaRepository<DatabaseInstance, Long> {
}
