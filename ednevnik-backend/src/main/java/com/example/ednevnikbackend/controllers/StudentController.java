package com.example.ednevnikbackend.controllers;


import com.example.ednevnikbackend.dtos.StudentDTO;
import com.example.ednevnikbackend.dtos.StudentDetailsDTO;
import com.example.ednevnikbackend.dtos.StudentGradesForParentDTO;
import com.example.ednevnikbackend.dtos.SubjectGradesDTO;
import com.example.ednevnikbackend.models.SubjectGrades;
import com.example.ednevnikbackend.services.StudentService;
import jakarta.persistence.criteria.CriteriaBuilder;
import org.springframework.beans.factory.annotation.Autowired;

import com.example.ednevnikbackend.models.Student;
import com.example.ednevnikbackend.services.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("/api/students")
public class StudentController {

    @Autowired
    private StudentService studentService;

    @GetMapping("/{id}")
    public StudentDetailsDTO getStudentDetails(@PathVariable Integer id) {
        return studentService.getStudentDetails(id);


    }

    @GetMapping("/absence/{studentId}")
    public ResponseEntity<Student> getStudentById(@PathVariable Integer studentId) {
        Optional<Student> student = studentService.findById(studentId);
        return student.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/byParentId/{parentId}")
    public StudentDTO getStudentByParentId(@PathVariable Integer parentId){
        return  studentService.getStudentByParentId(parentId);
    }

    @GetMapping("/gradesOrderedByDate/{parentId}/{schoolYearId}")
    public List<StudentGradesForParentDTO> getOrderedGrades(@PathVariable Integer parentId, @PathVariable Integer schoolYearId){

        return studentService.getStudentGradesByParentIdDateDesc(parentId,schoolYearId);
    }
}
