package com.example.ednevnikbackend.controllers;

import com.example.ednevnikbackend.dtos.StudentDTO;
import com.example.ednevnikbackend.dtos.StudentSubjectGradesDTO;
import com.example.ednevnikbackend.models.Student;
import com.example.ednevnikbackend.services.SchoolClassService;
import com.example.ednevnikbackend.services.SubjectGradesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/grades")
public class GradesController {

    @Autowired
    private SubjectGradesService subjectGradesService;


    @Autowired
    private SchoolClassService schoolClassService;

    @GetMapping("/bySchoolClassIdAndProfessorId/{schoolClassId}/{professorId}")
    List<StudentSubjectGradesDTO> getAllStudentGradesByStudentIdAndProfessorId(@PathVariable Integer schoolClassId, @PathVariable Integer professorId){


        return subjectGradesService.getAllStudentGradesByStudentIdAndProfessorId(schoolClassId,professorId);
    }

}
