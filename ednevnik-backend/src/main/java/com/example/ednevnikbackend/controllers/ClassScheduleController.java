package com.example.ednevnikbackend.controllers;

import com.example.ednevnikbackend.dtos.ClassScheduleDTO;
import com.example.ednevnikbackend.models.ClassSchedule;
import com.example.ednevnikbackend.services.ClassScheduleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

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

    @GetMapping("/{userId}")
    public ResponseEntity<Map<String, Integer>> getClassScheduleId(@PathVariable Integer userId) {
        try {
            Integer classScheduleId = classScheduleService.getClassScheduleIdForLoggedInParent(userId);
            Map<String, Integer> response = new HashMap<>();
            response.put("classScheduleId", classScheduleId);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }
}
