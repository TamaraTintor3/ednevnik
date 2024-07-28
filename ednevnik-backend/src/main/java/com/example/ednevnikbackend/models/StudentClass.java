package com.example.ednevnikbackend.models;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "student_class", schema = "public", catalog = "ednevnik")
public class StudentClass {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "student_class_id")
    private Integer studentClassId;
    @Basic
    @Column(name = "behavior")
    private String behavior;
    @Basic
    @Column(name = "final_grade")
    private Double finalGrade;
    @ManyToOne
    @JoinColumn(name = "student_id", referencedColumnName = "student_id", nullable = false)
    private Student student;
    @ManyToOne
    @JoinColumn(name = "school_class_id", referencedColumnName = "school_class_id", nullable = false)
    private SchoolClass schoolClass;
}
