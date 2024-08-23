package com.example.ednevnikbackend.controllers;

import com.example.ednevnikbackend.dtos.SubjectDTO;
import com.example.ednevnikbackend.services.SubjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

}
