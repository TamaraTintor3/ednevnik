package com.example.ednevnikbackend.services;

import com.example.ednevnikbackend.dtos.StudentClassDTO;
import com.example.ednevnikbackend.models.Absence;
import com.example.ednevnikbackend.models.StudentClass;
import jakarta.persistence.criteria.CriteriaBuilder;

import java.util.List;

public interface StudentClassService {
    StudentClass saveOrUpdateStudentClass(StudentClassDTO studentClassDTO);
    List<StudentClass> getStudentClassByStudentId(Integer studentId);
}
