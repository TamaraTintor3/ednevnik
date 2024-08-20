package com.example.ednevnikbackend.controllers;

import com.example.ednevnikbackend.dtos.StudentClassDTO;
import com.example.ednevnikbackend.models.StudentClass;
import com.example.ednevnikbackend.services.StudentClassService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/student-classes")
public class StudentClassControler {

    @Autowired
    private StudentClassService studentClassService;

    @PostMapping("/add")
    public ResponseEntity<StudentClass> saveOrUpdateStudentClass(@RequestBody StudentClassDTO studentClassDTO) {
        StudentClass savedStudentClass = studentClassService.saveOrUpdateStudentClass(studentClassDTO);
        return ResponseEntity.ok(savedStudentClass);
    }
}
