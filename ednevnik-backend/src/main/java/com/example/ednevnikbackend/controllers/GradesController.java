package com.example.ednevnikbackend.controllers;

import com.example.ednevnikbackend.dtos.*;
import com.example.ednevnikbackend.models.SchoolYear;
import com.example.ednevnikbackend.models.Student;
import com.example.ednevnikbackend.models.User;
import com.example.ednevnikbackend.services.SchoolClassService;
import com.example.ednevnikbackend.services.SubjectGradesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    List<StudentSubjectGradesDTO> getAllStudentGradesByStudentIdAndProfessorId(@PathVariable Integer schoolClassId, @PathVariable Integer professorId) {


        return subjectGradesService.getAllStudentGradesByStudentIdAndProfessorId(schoolClassId, professorId);
    }

    @PostMapping("/addGrade")
    ResponseEntity<SubjectGradesDTO> addGrade(@RequestBody AddSubjectGradesDTO req) {

      return new  ResponseEntity<>(subjectGradesService.addGrade(req), HttpStatus.OK);

    }

    @PutMapping("/editGradeById/{id}")
    public ResponseEntity<?> editGrade(@PathVariable Integer id, @RequestBody AddSubjectGradesDTO grade){

       SubjectGradesDTO subjectGradesDTO = subjectGradesService.editGrade(id,grade);

        return new ResponseEntity<>(subjectGradesDTO, HttpStatus.OK);
    }

}
