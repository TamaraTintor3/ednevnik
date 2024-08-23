package com.example.ednevnikbackend.daos;

import com.example.ednevnikbackend.models.SchoolCalendar;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SchoolCalendarDAO extends JpaRepository<SchoolCalendar,Integer> {
    List<SchoolCalendar> findAllByProfessor_ProfessorId(Integer id);
}
