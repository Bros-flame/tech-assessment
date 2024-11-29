package com.brosflame.task_management.repository;

import com.brosflame.task_management.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import com.brosflame.task_management.entity.Task;

import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findAllByUserOrderByDueDateAsc(User user);
}
