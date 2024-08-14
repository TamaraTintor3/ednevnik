package com.example.ednevnikbackend.models;

import jakarta.persistence.*;

import java.util.Objects;

@Entity
public class Teaching {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "teaching_id", nullable = false)
    private int teachingId;
    @Basic
    @Column(name = "professor_id", nullable = false)
    private int professorId;
    @Basic
    @Column(name = "school_class_id", nullable = false)
    private int schoolClassId;

    public int getTeachingId() {
        return teachingId;
    }

    public void setTeachingId(int teachingId) {
        this.teachingId = teachingId;
    }

    public int getProfessorId() {
        return professorId;
    }

    public void setProfessorId(int professorId) {
        this.professorId = professorId;
    }

    public int getSchoolClassId() {
        return schoolClassId;
    }

    public void setSchoolClassId(int schoolClassId) {
        this.schoolClassId = schoolClassId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Teaching teaching = (Teaching) o;
        return teachingId == teaching.teachingId && professorId == teaching.professorId && schoolClassId == teaching.schoolClassId;
    }

    @Override
    public int hashCode() {
        return Objects.hash(teachingId, professorId, schoolClassId);
    }
}
