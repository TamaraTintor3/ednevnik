package com.example.ednevnikbackend.dtos;

import com.example.ednevnikbackend.models.Subject;
import lombok.Data;

import java.sql.Date;

@Data
public class AddSubjectGradesDTO {



    private Date date;

    private Integer grade;

    private String description;

    private Boolean finalSubjectGrade;

    private Integer  subjectId;

    private Integer studentId;

    private Integer schoolYearId;

}
