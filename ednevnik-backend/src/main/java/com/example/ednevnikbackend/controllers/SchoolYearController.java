package com.example.ednevnikbackend.controllers;

import com.example.ednevnikbackend.models.SchoolYear;
import com.example.ednevnikbackend.services.SchoolClassService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/school-years")
public class SchoolYearController {

    @Autowired
    private SchoolClassService schoolClassService;

    @GetMapping("/current")
    public SchoolYear getCurrentSchoolYear(){
        return schoolClassService.findCurrentSchoolYear();
    }

}
