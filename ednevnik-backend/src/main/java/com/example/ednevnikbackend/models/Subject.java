package com.example.ednevnikbackend.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
@Entity
@Table(name = "subject", schema = "public", catalog = "ednevnik")
public class Subject {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "subject_id")
    private Integer subjectId;
    @Basic
    @Column(name = "name")
    private String name;
    @OneToMany(mappedBy = "subject")
    @JsonIgnore
    private List<ScheduleSubject> scheduleSubjects;
    @ManyToOne
    @JoinColumn(name = "professor_id", referencedColumnName = "professor_id", nullable = false)
    private Professor professor;
    @OneToMany(mappedBy = "subject")
    @JsonIgnore
    private List<SubjectGrades> subjectGrades;
}
