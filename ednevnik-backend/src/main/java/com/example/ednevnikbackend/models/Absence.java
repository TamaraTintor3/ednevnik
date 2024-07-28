package com.example.ednevnikbackend.models;

import jakarta.persistence.*;
import lombok.Data;

import java.sql.Date;

@Data
@Entity
@Table(name = "absence", schema = "public", catalog = "ednevnik")
public class Absence {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "absence_id")
    private Integer absenceId;
    @Basic
    @Column(name = "date_of_absence")
    private Date dateOfAbsence;
    @Basic
    @Column(name = "reason")
    private String reason;
    @Basic
    @Column(name = "number_of_classes")
    private Integer numberOfClasses;
    @Basic
    @Column(name = "approved")
    private Boolean approved;
    @ManyToOne
    @JoinColumn(name = "student_id", referencedColumnName = "student_id", nullable = false)
    private Student student;
}
