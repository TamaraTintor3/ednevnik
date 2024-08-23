package com.example.ednevnikbackend.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
@Entity
@Table(name = "school_class", schema = "public", catalog = "ednevnik")
public class SchoolClass {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "school_class_id")
    private Integer schoolClassId;
    @Basic
    @Column(name = "name")
    private String name;
    @OneToMany(mappedBy = "schoolClass")
    @JsonIgnore
    private List<ClassSchedule> classSchedules;
    @OneToMany(mappedBy = "schoolClass")
    @JsonIgnore
    private List<Professor> professors;
    @ManyToOne
    @JoinColumn(name = "school_year_id", referencedColumnName = "school_year_id", nullable = false)
    @JsonIgnore
    private SchoolYear schoolYear;
    @OneToMany(mappedBy = "schoolClass")
    @JsonIgnore
    private List<Student> students;
    @OneToMany(mappedBy = "schoolClass")
    @JsonIgnore
    private List<StudentClass> studentClasses;

//    @OneToMany(mappedBy = "schoolClass")
//    @JsonIgnore
//    private List<Teaching> teachings;
}
