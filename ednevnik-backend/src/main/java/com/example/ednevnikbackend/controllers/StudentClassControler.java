package com.example.ednevnikbackend.controllers;

import com.example.ednevnikbackend.dtos.StudentClassDTO;
import com.example.ednevnikbackend.models.Absence;
import com.example.ednevnikbackend.models.StudentClass;
import com.example.ednevnikbackend.services.StudentClassService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/student-classes")
public class StudentClassControler {

    @Autowired
    private StudentClassService studentClassService;

    @PostMapping("/add")
    public ResponseEntity<StudentClass> addStudentClass(@RequestBody StudentClassDTO studentClassDTO) {
        StudentClass savedStudentClass = studentClassService.addStudentClass(studentClassDTO);
        return ResponseEntity.ok(savedStudentClass);
    }
    @PutMapping("/update/{id}")
    public ResponseEntity<StudentClass> updateStudentClass(@PathVariable Integer id, @RequestBody StudentClassDTO studentClassDTO) {
        StudentClass updatedStudentClass = studentClassService.updateStudentClass(id, studentClassDTO);
        return ResponseEntity.ok(updatedStudentClass);
    }

    @GetMapping("/{studentId}")
    public ResponseEntity<List<StudentClass>> getStudentClassByStudentId(@PathVariable Integer studentId) {
        List<StudentClass> studentClasses = studentClassService.getStudentClssByStudentId(studentId);
        return ResponseEntity.ok(studentClasses);
    }

    @GetMapping("/byParentId/{parentId}")
    public  List<StudentClassDTO> getStudentClassesByParentId(@PathVariable Integer parentId){
        return  studentClassService.getStudentClassesByParentId(parentId);
    }
}

