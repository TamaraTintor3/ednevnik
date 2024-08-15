package com.example.ednevnikbackend.dtos;

import com.example.ednevnikbackend.models.SchoolYear;
import com.example.ednevnikbackend.models.Student;
import com.example.ednevnikbackend.models.Subject;
import jakarta.persistence.*;
import lombok.Data;

import java.sql.Date;

@Data
public class SubjectGradesDTO {


    private Integer subjectGradesId;

    private Date date;

    private Integer grade;

    private String description;

    private Boolean finalSubjectGrade;

    private Subject subject;

    private Integer studentStudentId;


}
