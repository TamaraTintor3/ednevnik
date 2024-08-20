package com.example.ednevnikbackend.services;

import com.example.ednevnikbackend.dtos.StudentClassDTO;
import com.example.ednevnikbackend.models.StudentClass;

public interface StudentClassService {
    StudentClass saveOrUpdateStudentClass(StudentClassDTO studentClassDTO);
}
