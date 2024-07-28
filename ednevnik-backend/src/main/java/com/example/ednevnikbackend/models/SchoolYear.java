package com.example.ednevnikbackend.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
@Entity
@Table(name = "school_year", schema = "public", catalog = "ednevnik")
public class SchoolYear {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "school_year_id")
    private Integer schoolYearId;
    @Basic
    @Column(name = "year")
    private String year;
    @Basic
    @Column(name = "semester")
    private Integer semester;
    @OneToMany(mappedBy = "schoolYear")
    @JsonIgnore
    private List<SchoolClass> schoolClasses;
    @OneToMany(mappedBy = "schoolYear")
    @JsonIgnore
    private List<SubjectGrades> subjectGrades;
}
