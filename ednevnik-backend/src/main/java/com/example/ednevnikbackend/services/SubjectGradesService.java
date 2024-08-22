package com.example.ednevnikbackend.services;

import com.example.ednevnikbackend.dtos.*;
import com.example.ednevnikbackend.models.SubjectGrades;
import java.util.List;

public interface SubjectGradesService {


    List<StudentSubjectGradesDTO> getAllStudentGradesByStudentIdAndProfessorId(Integer schoolClassId, Integer professorId);

    SubjectGradesDTO addGrade(AddSubjectGradesDTO req);

    SubjectGradesDTO editGrade(Integer id, AddSubjectGradesDTO grade);

    List<GradesDTO> getAllStudentGradesByYear(Integer schoolYearId, Integer studentId);



    List<FinalGradeDTO> getFinalGradesByStudentIdSchoolYearId(Integer schoolYearId, Integer studentId);
}
