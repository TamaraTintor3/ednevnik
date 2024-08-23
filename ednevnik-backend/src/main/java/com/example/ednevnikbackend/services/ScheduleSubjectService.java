package com.example.ednevnikbackend.services;

import com.example.ednevnikbackend.dtos.ScheduleSubjectDTO;
import com.example.ednevnikbackend.models.ScheduleSubject;

import java.util.List;

public interface ScheduleSubjectService {
    ScheduleSubject addScheduleSubject(ScheduleSubjectDTO scheduleSubjectDTO);
    ScheduleSubject updateScheduleSubject(Integer id, ScheduleSubjectDTO scheduleSubjectDTO);
    List<ScheduleSubject> getScheduleSubjectsByClassScheduleId(Integer classScheduleId);
}
