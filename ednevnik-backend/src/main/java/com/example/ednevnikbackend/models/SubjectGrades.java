package com.example.ednevnikbackend.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

import java.sql.Date;

@Data
@Entity
@Table(name = "subject_grades", schema = "public", catalog = "ednevnik")
public class SubjectGrades {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "subject_grades_id")
    private Integer subjectGradesId;
    @Basic
    @Column(name = "date")
    private Date date;
    @Basic
    @Column(name = "grade")
    private Integer grade;
    @Basic
    @Column(name = "description")
    private String description;
    @Basic
    @Column(name = "final_subject_grade")
    private Boolean finalSubjectGrade;
    @ManyToOne
    @JoinColumn(name = "subject_id", referencedColumnName = "subject_id", nullable = false)
    private Subject subject;
    @ManyToOne
    @JoinColumn(name = "student_id", referencedColumnName = "student_id", nullable = false)
    @JsonIgnore
    private Student student;
    @ManyToOne
    @JoinColumn(name = "school_year_id", referencedColumnName = "school_year_id")
    private SchoolYear schoolYear;
}
