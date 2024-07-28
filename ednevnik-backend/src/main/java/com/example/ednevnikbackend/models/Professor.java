package com.example.ednevnikbackend.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
@Entity
@Table(name = "professor", schema = "public", catalog = "ednevnik")
public class Professor {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "professor_id")
    private Integer professorId;
    @Basic
    @Column(name = "class_professor")
    private Boolean classProfessor;
    @OneToMany(mappedBy = "professor")
    @JsonIgnore
    private List<Message> messages;
    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "user_id", nullable = false)
    private User user;
    @ManyToOne
    @JoinColumn(name = "school_class_id", referencedColumnName = "school_class_id")
    private SchoolClass schoolClass;
    @OneToMany(mappedBy = "professor")
    @JsonIgnore
    private List<SchoolCalendar> schoolCalendars;
    @OneToMany(mappedBy = "professor")
    @JsonIgnore
    private List<Subject> subjects;
}
