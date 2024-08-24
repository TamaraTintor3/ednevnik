package com.example.ednevnikbackend.controllers;

import com.example.ednevnikbackend.dtos.AbsenceBehaviorDTO;
import com.example.ednevnikbackend.dtos.AbsenceDTO;
import com.example.ednevnikbackend.dtos.AbsenceUpdateDTO;
import com.example.ednevnikbackend.models.Absence;
import com.example.ednevnikbackend.services.AbsenceBehaviorService;
import com.example.ednevnikbackend.services.AbsenceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/absences")
public class AbsenceController {

    @Autowired
    AbsenceService absenceService;
    @Autowired
    private AbsenceBehaviorService absenceBehaviorService;

    @PostMapping("/add")
    public ResponseEntity<Absence> addAbsence(@RequestBody AbsenceDTO absenceDTO) {
        Absence savedAbsence = absenceService.addAbsence(absenceDTO);
        return ResponseEntity.ok(savedAbsence);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Absence> updateAbsence(@PathVariable Integer id, @RequestBody AbsenceUpdateDTO absenceUpdateDTO) {
        Absence updatedAbsence = absenceService.updateAbsence(id, absenceUpdateDTO);
        return ResponseEntity.ok(updatedAbsence);
    }

    @GetMapping("/student/{studentId}")
    public ResponseEntity<List<Absence>> getAbsencesByStudentId(@PathVariable Integer studentId) {
        List<Absence> absences = absenceService.getAbsencesByStudentId(studentId);
        return ResponseEntity.ok(absences);
    }

    @GetMapping("/parent/{parentId}")
    public AbsenceBehaviorDTO getAllAbsencesForParent(@PathVariable Integer parentId){
        return absenceBehaviorService.getDataForParent(parentId);
    }
}
