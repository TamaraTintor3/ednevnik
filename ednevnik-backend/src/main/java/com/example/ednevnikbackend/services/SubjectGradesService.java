package com.example.ednevnikbackend.services;

import com.example.ednevnikbackend.dtos.AddSubjectGradesDTO;
import com.example.ednevnikbackend.dtos.GradesDTO;
import com.example.ednevnikbackend.dtos.StudentSubjectGradesDTO;
import com.example.ednevnikbackend.dtos.SubjectGradesDTO;
import com.example.ednevnikbackend.models.SubjectGrades;
import java.util.List;

public interface SubjectGradesService {


    List<StudentSubjectGradesDTO> getAllStudentGradesByStudentIdAndProfessorId(Integer schoolClassId, Integer professorId);

    SubjectGradesDTO addGrade(AddSubjectGradesDTO req);

    SubjectGradesDTO editGrade(Integer id, AddSubjectGradesDTO grade);

    List<GradesDTO> getAllStudentGradesByYear(Integer schoolYearId, Integer studentId);

}
