package com.example.ednevnikbackend.daos;

import com.example.ednevnikbackend.models.SubjectGrades;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SubjectGradesDAO extends JpaRepository<SubjectGrades, Integer> {

    public List<SubjectGrades> findAllByStudent_StudentIdAndSubject_Professor_ProfessorId(Integer studentId, Integer professorId);

}
