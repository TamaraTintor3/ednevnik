package com.example.ednevnikbackend.services;

import com.example.ednevnikbackend.dtos.AddStudentDTO;
import com.example.ednevnikbackend.dtos.StudentDTO;
import com.example.ednevnikbackend.dtos.StudentDetailsDTO;
import com.example.ednevnikbackend.models.Student;

import java.util.List;
import java.util.Optional;

public interface StudentService {
    public List<AddStudentDTO> getStudentsByClassId(Integer classId);
    public AddStudentDTO addStudent(AddStudentDTO addStudentDTO);
    Optional<Student> findById(Integer studentId);
    StudentDetailsDTO getStudentDetails(Integer id);
}
