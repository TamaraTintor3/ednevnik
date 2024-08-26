package com.example.ednevnikbackend.controllers;

import com.example.ednevnikbackend.dtos.AddSubjectDTO;
import com.example.ednevnikbackend.dtos.SubjectDTO;
import com.example.ednevnikbackend.models.Subject;
import com.example.ednevnikbackend.services.SubjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import java.util.List;

@RestController
@RequestMapping("/api/subjects")
public class SubjectController {

    @Autowired
    private SubjectService subjectService;

    @GetMapping("/{id}")
    public SubjectDTO getSubjectById(@PathVariable Integer id) {
        return subjectService.getSubjectByProfessorId(id);
    }

    @GetMapping
    public List<SubjectDTO> getAll() {
        return subjectService.getAll();
    }

  

    @GetMapping("/getAll")
    public List<Subject> getAllSubjects() {
        return subjectService.getAllSubjects();
    }

    @PostMapping
    public ResponseEntity<?> addSubject(@RequestBody AddSubjectDTO addSubjectDTO){

        return new ResponseEntity<>(subjectService.addSubject(addSubjectDTO), HttpStatus.OK);

    }

}
