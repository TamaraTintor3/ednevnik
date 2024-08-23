package com.example.ednevnikbackend.dtos;

import com.example.ednevnikbackend.models.SchoolYear;
import com.example.ednevnikbackend.models.Student;
import com.example.ednevnikbackend.models.Subject;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

import java.sql.Date;

@Data
public class StudentGradesForParentDTO {

    private Integer subjectGradesId;

    private Date date;

    private Integer grade;

    private String description;

    private Boolean finalSubjectGrade;

    private String subjectSubjectName;

    private Integer subjectSubjectId;


}
