package com.example.ednevnikbackend.controllers;

import com.example.ednevnikbackend.dtos.ClassProfessorDTO;

import com.example.ednevnikbackend.dtos.ProfessorDTO;

import com.example.ednevnikbackend.dtos.ProfessorInfoDTO;

import com.example.ednevnikbackend.dtos.SchoolClassDTO;
import com.example.ednevnikbackend.services.ProfessorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/professors")
public class ProfessorController {
    @Autowired
    private ProfessorService professorService;

    @PostMapping("/class")
    public SchoolClassDTO getProfessorsClass(@RequestBody ClassProfessorDTO classProfessorDTO){
        return professorService.getProfessorsSchoolClass(classProfessorDTO);
    }


    @GetMapping
    public List<ProfessorDTO> getAllProfessors() {
        return professorService.getAllProfessors();
    }

    @GetMapping("/school-class/{schoolClassId}")
    public ProfessorInfoDTO getClassProfessorBySchoolClassId(@PathVariable Integer schoolClassId) {
        return professorService.getClassProfessorBySchoolClassId(schoolClassId);

    @GetMapping("/byId/{id}")
    public ProfessorDTO getById(@PathVariable Integer id){
        return professorService.getProfessorById(id);
    }

    @GetMapping("/getProfessorsWithoutSubject")
    public List<ProfessorDTO> getProfessorsWithoutSubject(){
            return professorService.getProfessorsWithoutSubject();
    }
}
