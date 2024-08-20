package com.example.ednevnikbackend.controllers;

import com.example.ednevnikbackend.dtos.ClassProfessorDTO;
import com.example.ednevnikbackend.dtos.SchoolClassDTO;
import com.example.ednevnikbackend.services.ProfessorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/professors")
public class ProfessorController {
    @Autowired
    private ProfessorService professorService;

    @PostMapping("/class")
    public SchoolClassDTO getProfessorsClass(@RequestBody ClassProfessorDTO classProfessorDTO){
        return professorService.getProfessorsSchoolClass(classProfessorDTO);
    }
}
