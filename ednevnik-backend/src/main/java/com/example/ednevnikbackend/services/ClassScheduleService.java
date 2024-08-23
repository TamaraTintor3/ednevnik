package com.example.ednevnikbackend.services;

import com.example.ednevnikbackend.dtos.ClassScheduleDTO;
import com.example.ednevnikbackend.models.ClassSchedule;

public interface ClassScheduleService {
    ClassSchedule createClassSchedule(ClassScheduleDTO classScheduleDto);
}
