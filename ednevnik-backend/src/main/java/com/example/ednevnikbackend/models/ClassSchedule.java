package com.example.ednevnikbackend.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
@Entity
@Table(name = "class_schedule", schema = "public", catalog = "ednevnik")
public class ClassSchedule {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "class_schedule_id")
    private Integer classScheduleId;
    @ManyToOne
    @JoinColumn(name = "school_class_id", referencedColumnName = "school_class_id", nullable = false)
    private SchoolClass schoolClass;
    @OneToMany(mappedBy = "classSchedule")
    @JsonIgnore
    private List<ScheduleSubject> scheduleSubjects;
}
