package com.example.ednevnikbackend.controllers;

import com.example.ednevnikbackend.dtos.NewSchoolCalendarEventDTO;
import com.example.ednevnikbackend.dtos.SchoolCalendarDTO;
import com.example.ednevnikbackend.models.SchoolCalendar;
import com.example.ednevnikbackend.services.SchoolCalendarService;
import jakarta.persistence.criteria.CriteriaBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/events")
public class SchoolCalendarController {
    @Autowired
    private SchoolCalendarService schoolCalendarService;

    @GetMapping("/{professorId}")
    public List<SchoolCalendarDTO> getSchoolCalendarEventsByProfessorId(@PathVariable Integer professorId){
        return schoolCalendarService.getSchoolCalendarEventsByProfessorId(professorId);
    }

    @PostMapping
    public SchoolCalendarDTO insertNewSchoolCalendarEvent(@RequestBody NewSchoolCalendarEventDTO newSchoolCalendarEventDTO){
        return schoolCalendarService.insertSchoolCalendarEvent(newSchoolCalendarEventDTO);
    }
    @PostMapping("/{id}")
    public SchoolCalendarDTO insertNewSchoolCalendarEvent(@PathVariable Integer id,@RequestBody NewSchoolCalendarEventDTO newSchoolCalendarEventDTO){
        return schoolCalendarService.updateSchoolCalendarEvent(id,newSchoolCalendarEventDTO);
    }

    @DeleteMapping("/{id}")
    public void deleteSchoolCalendarEvent(@PathVariable Integer id){
        schoolCalendarService.deleteSchoolCalendarEvent(id);
    }
}
