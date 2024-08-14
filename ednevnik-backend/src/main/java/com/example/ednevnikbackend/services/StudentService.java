package com.example.ednevnikbackend.services;

import com.example.ednevnikbackend.dtos.AddStudentDTO;
import com.example.ednevnikbackend.dtos.StudentDTO;

import java.util.List;

public interface StudentService {
    public List<AddStudentDTO> getStudentsByClassId(Integer classId);
    public AddStudentDTO addStudent(AddStudentDTO addStudentDTO);
}
