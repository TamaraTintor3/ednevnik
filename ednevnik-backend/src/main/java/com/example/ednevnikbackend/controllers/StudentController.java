package com.example.ednevnikbackend.controllers;

import com.example.ednevnikbackend.dtos.StudentDetailsDTO;
import com.example.ednevnikbackend.services.StudentService;
import jakarta.persistence.criteria.CriteriaBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/students")
public class StudentController {
    @Autowired
    private StudentService studentService;

    @GetMapping("/{id}")
    public StudentDetailsDTO getStudentDetails(@PathVariable Integer id){
        return studentService.getStudentDetails(id);
    }
}
