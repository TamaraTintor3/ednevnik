package com.example.ednevnikbackend.daos;

import com.example.ednevnikbackend.models.SubjectGrades;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface SubjectGradesDAO extends JpaRepository<SubjectGrades, Integer> {

    public List<SubjectGrades> findAllByStudent_StudentIdAndSubject_Professor_ProfessorIdAndSchoolYear_SchoolYearId(Integer studentId, Integer professorId, Integer schoolYearId);
    List<SubjectGrades> getSubjectGradesBySchoolYear_SchoolYearIdAndStudent_StudentId(Integer schoolYearId,Integer studentId);
    public List<SubjectGrades> findAllByStudent_StudentIdAndSchoolYear_SchoolYearIdAndFinalSubjectGrade(Integer studentId,  Integer schoolYearId, Boolean isFinal);

}
