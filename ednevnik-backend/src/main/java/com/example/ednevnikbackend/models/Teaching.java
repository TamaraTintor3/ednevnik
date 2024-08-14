package com.example.ednevnikbackend.models;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Objects;

@Entity
@Data
public class Teaching {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "teaching_id", nullable = false)
    private int teachingId;
    @Basic
    @Column(name = "professor_id", nullable = false)
    private int professorId;
//    @Basic
//    @Column(name = "school_class_id", nullable = false)
//    private int schoolClassId;

    @ManyToOne
    @JoinColumn(name = "school_class_id", referencedColumnName = "school_class_id", nullable = false)
    private SchoolClass schoolClass;

}
