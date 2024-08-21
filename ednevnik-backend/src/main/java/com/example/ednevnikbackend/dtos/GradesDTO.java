package com.example.ednevnikbackend.dtos;

import lombok.Data;

import java.util.List;

// DTO za prikaz svih ocjena studenta po predmetima za razrednog starjesinu
@Data
public class GradesDTO {

    private String subjectName;
    private String professorFullName;
    private List<SingleSubjectGradeDTO> gradesWritten;
    private List<SingleSubjectGradeDTO> gradesVerbal;
}
