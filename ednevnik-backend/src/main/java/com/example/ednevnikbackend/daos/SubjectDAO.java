package com.example.ednevnikbackend.daos;

import com.example.ednevnikbackend.models.Subject;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SubjectDAO extends JpaRepository<Subject, Integer> {

    Subject findByProfessor_ProfessorId(Integer id);
    Subject findBySubjectId(Integer id);

   // List<Subject> findAll();
}
