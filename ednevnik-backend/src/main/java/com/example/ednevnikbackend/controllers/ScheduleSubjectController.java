package com.example.ednevnikbackend.controllers;

import com.example.ednevnikbackend.dtos.ScheduleSubjectDTO;
import com.example.ednevnikbackend.models.ScheduleSubject;
import com.example.ednevnikbackend.services.ScheduleSubjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/schedule-subjects")
public class ScheduleSubjectController {

    @Autowired
    private ScheduleSubjectService scheduleSubjectService;

    @PostMapping("/add")
    public ResponseEntity<ScheduleSubject> addScheduleSubject(@RequestBody ScheduleSubjectDTO scheduleSubjectDTO) {
        ScheduleSubject savedScheduleSubject = scheduleSubjectService.addScheduleSubject(scheduleSubjectDTO);
        return new ResponseEntity<>(savedScheduleSubject, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ScheduleSubject> updateScheduleSubject(@PathVariable("id") Integer id, @RequestBody ScheduleSubjectDTO scheduleSubjectDTO) {
        ScheduleSubject updatedScheduleSubject = scheduleSubjectService.updateScheduleSubject(id, scheduleSubjectDTO);
        return new ResponseEntity<>(updatedScheduleSubject, HttpStatus.OK);
    }

    @GetMapping("/class-schedule/{classScheduleId}")
    public ResponseEntity<List<ScheduleSubject>> getScheduleSubjectsByClassScheduleId(@PathVariable("classScheduleId") Integer classScheduleId) {
        List<ScheduleSubject> scheduleSubjects = scheduleSubjectService.getScheduleSubjectsByClassScheduleId(classScheduleId);
        return ResponseEntity.ok(scheduleSubjects);
    }
}
