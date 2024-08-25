package com.example.ednevnikbackend.controllers;

import com.example.ednevnikbackend.daos.TeachingDAO;
import com.example.ednevnikbackend.dtos.AddTeachingDTO;
import com.example.ednevnikbackend.dtos.ProfessorDTO;
import com.example.ednevnikbackend.dtos.TeachingDTO;
import com.example.ednevnikbackend.services.TeachingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/teachings")
public class TeachingController {

    @Autowired
    private TeachingService teachingService;
//    @GetMapping("/byClassIdAndProfId/{classId}/{profId}")
//    public ResponseEntity<?> getTeachingByClassIdAndProfessorId(@PathVariable Integer classId, @PathVariable Integer profId){
//        return null;
//    }


    @GetMapping("/professors/{id}")
    List<ProfessorDTO> getAllProfsBySchoolClassId(@PathVariable Integer id){
       return teachingService.getAllBySchoolClassId(id);
    }

    @PostMapping
    ResponseEntity<?> addTeaching(@RequestBody AddTeachingDTO req){
        return new ResponseEntity<>(teachingService.addTeaching(req), HttpStatus.OK);
    }

}
