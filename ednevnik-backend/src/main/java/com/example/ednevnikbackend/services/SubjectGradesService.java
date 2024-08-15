package com.example.ednevnikbackend.services;

import com.example.ednevnikbackend.dtos.StudentSubjectGradesDTO;

import java.util.List;

public interface SubjectGradesService {

    public List<StudentSubjectGradesDTO> getAllStudentGradesByStudentIdAndProfessorId(Integer schoolClassId, Integer professorId);

}
