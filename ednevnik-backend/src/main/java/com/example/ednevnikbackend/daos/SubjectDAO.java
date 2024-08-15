package com.example.ednevnikbackend.daos;

import com.example.ednevnikbackend.models.Subject;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SubjectDAO extends JpaRepository<Subject, Integer> {

    Subject findByProfessor_ProfessorId(Integer id);

}
