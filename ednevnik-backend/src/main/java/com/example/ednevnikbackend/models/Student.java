package com.example.ednevnikbackend.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
@Entity
@Table(name = "student", schema = "public", catalog = "ednevnik")
public class Student {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "student_id")
    private Integer studentId;
    @Basic
    @Column(name = "first_name")
    private String firstName;
    @Basic
    @Column(name = "last_name")
    private String lastName;
    @Basic
    @Column(name = "jmbg")
    private String jmbg;
    @OneToMany(mappedBy = "student")
    @JsonIgnore
    private List<Absence> absences;
    @ManyToOne
    @JoinColumn(name = "school_class_id", referencedColumnName = "school_class_id", nullable = false)
    private SchoolClass schoolClass;
    @ManyToOne
    @JoinColumn(name = "parent_id", referencedColumnName = "parent_id")
    private Parent parent;
    @OneToMany(mappedBy = "student")
    @JsonIgnore
    private List<StudentClass> studentClasses;
    @OneToMany(mappedBy = "student")
    @JsonIgnore
    private List<SubjectGrades> subjectGrades;
}
