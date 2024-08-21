package com.example.ednevnikbackend.dtos;

import lombok.Data;

import java.sql.Date;

@Data
public class SingleSubjectGradeDTO {
    private Integer subjectGradesId;

    private Date date;

    private Integer grade;

    private String description;

    private Boolean finalSubjectGrade;
}
