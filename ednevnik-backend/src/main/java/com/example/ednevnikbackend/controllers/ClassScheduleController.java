package com.example.ednevnikbackend.controllers;

import com.example.ednevnikbackend.dtos.ClassScheduleDTO;
import com.example.ednevnikbackend.models.ClassSchedule;
import com.example.ednevnikbackend.services.ClassScheduleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/class-schedules")
public class ClassScheduleController {

    @Autowired
    private ClassScheduleService classScheduleService;

    @PostMapping("/get-or-create")
    public ResponseEntity<ClassSchedule> getOrCreateClassSchedule(@RequestBody ClassScheduleDTO classScheduleDTO) {
        ClassSchedule classSchedule = classScheduleService.createClassSchedule(classScheduleDTO);
        return ResponseEntity.ok(classSchedule);
    }
}
