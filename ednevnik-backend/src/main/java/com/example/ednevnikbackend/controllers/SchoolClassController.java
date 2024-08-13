package com.example.ednevnikbackend.controllers;

import com.example.ednevnikbackend.models.Role;
import com.example.ednevnikbackend.models.SchoolClass;
import com.example.ednevnikbackend.dtos.SchoolClassDTO;
import com.example.ednevnikbackend.services.SchoolClassService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Comparator;
import java.util.List;

@RestController
@RequestMapping("/api/school-classes")
public class SchoolClassController {
    @Autowired
    private SchoolClassService schoolClassService;

    @GetMapping
    public List<SchoolClassDTO> getAllSchoolClasses(){
        return schoolClassService.findAllSchoolClasses().stream().sorted(Comparator.comparing(SchoolClassDTO::getSchoolYearYear).reversed()).toList();
    }

    @GetMapping("/{id}")
    public SchoolClassDTO getAllSchoolClasses(@PathVariable Integer id){
        return schoolClassService.findSchoolClassById(id);
    }
}
