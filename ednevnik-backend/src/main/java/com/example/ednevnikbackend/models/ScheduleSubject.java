package com.example.ednevnikbackend.models;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "schedule_subject", schema = "public", catalog = "ednevnik")
public class ScheduleSubject {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "schedule_subject_id")
    private Integer scheduleSubjectId;
    @Basic
    @Column(name = "subject_order")
    private Integer subjectOrder;
    @Basic
    @Column(name = "day")
    private String day;
    @ManyToOne
    @JoinColumn(name = "subject_id", referencedColumnName = "subject_id", nullable = false)
    private Subject subject;
    @ManyToOne
    @JoinColumn(name = "class_schedule_id", referencedColumnName = "class_schedule_id", nullable = false)
    private ClassSchedule classSchedule;
}
