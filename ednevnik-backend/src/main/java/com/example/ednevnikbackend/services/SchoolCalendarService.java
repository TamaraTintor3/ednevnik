package com.example.ednevnikbackend.services;

import com.example.ednevnikbackend.daos.SchoolCalendarDAO;
import com.example.ednevnikbackend.dtos.NewSchoolCalendarEventDTO;
import com.example.ednevnikbackend.dtos.SchoolCalendarDTO;
import com.example.ednevnikbackend.models.SchoolCalendar;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

public interface SchoolCalendarService {
    List<SchoolCalendarDTO> getSchoolCalendarEventsByProfessorId(Integer id);
    SchoolCalendarDTO insertSchoolCalendarEvent(NewSchoolCalendarEventDTO newSchoolCalendarEventDTO);
    SchoolCalendarDTO updateSchoolCalendarEvent(Integer schoolCalendarId,NewSchoolCalendarEventDTO newSchoolCalendarEventDTO);
    void deleteSchoolCalendarEvent(Integer schoolCalendarId);
}
