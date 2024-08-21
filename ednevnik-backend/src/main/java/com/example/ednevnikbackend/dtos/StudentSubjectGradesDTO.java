package com.example.ednevnikbackend.dtos;

import lombok.Data;

import java.util.List;

@Data
public class StudentSubjectGradesDTO {

    private Integer studentId;
    private String firstName;
    private String lastName;
    private ParentInfoDTO parent;
    private SubjectGradesDTO finalGrade;
    private List<SubjectGradesDTO> gradesWritten;
    private List<SubjectGradesDTO> gradesVerbal;
}
