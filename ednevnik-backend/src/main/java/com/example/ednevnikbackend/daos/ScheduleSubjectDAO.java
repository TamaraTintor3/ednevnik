package com.example.ednevnikbackend.daos;

import com.example.ednevnikbackend.models.ScheduleSubject;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ScheduleSubjectDAO extends JpaRepository<ScheduleSubject, Integer> {
    List<ScheduleSubject> findByClassSchedule_ClassScheduleId(Integer classScheduleId);
}
