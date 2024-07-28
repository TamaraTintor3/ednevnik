package com.example.ednevnikbackend.models;

import jakarta.persistence.*;
import lombok.Data;

import java.sql.Date;

@Data
@Entity
@Table(name = "school_calendar", schema = "public", catalog = "ednevnik")
public class SchoolCalendar {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "school_calendar_id")
    private Integer schoolCalendarId;
    @Basic
    @Column(name = "description")
    private String description;
    @Basic
    @Column(name = "date")
    private Date date;
    @ManyToOne
    @JoinColumn(name = "professor_id", referencedColumnName = "professor_id", nullable = false)
    private Professor professor;
}
