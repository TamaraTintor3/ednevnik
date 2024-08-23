package com.example.ednevnikbackend.services.impl;

import com.example.ednevnikbackend.daos.ClassScheduleDAO;
import com.example.ednevnikbackend.daos.ScheduleSubjectDAO;
import com.example.ednevnikbackend.daos.SubjectDAO;
import com.example.ednevnikbackend.dtos.ScheduleSubjectDTO;
import com.example.ednevnikbackend.models.ClassSchedule;
import com.example.ednevnikbackend.models.ScheduleSubject;
import com.example.ednevnikbackend.models.Subject;
import com.example.ednevnikbackend.services.ScheduleSubjectService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ScheduleSubjectServiceImpl implements ScheduleSubjectService {

    @Autowired
    ScheduleSubjectDAO scheduleSubjectDAO;

    @Autowired
    SubjectDAO subjectDAO;

    @Autowired
    ClassScheduleDAO classScheduleDAO;

    @Autowired
    ModelMapper modelMapper;

    @Override
    public ScheduleSubject addScheduleSubject(ScheduleSubjectDTO scheduleSubjectDTO) {
        Subject subject = subjectDAO.findById(scheduleSubjectDTO.getSubjectId())
                .orElseThrow(() -> new RuntimeException("Subject not found"));
        ClassSchedule classSchedule = classScheduleDAO.findById(scheduleSubjectDTO.getClassScheduleId())
                .orElseThrow(() -> new RuntimeException("ClassSchedule not found"));

        ScheduleSubject scheduleSubject = new ScheduleSubject();
        scheduleSubject.setSubjectOrder(scheduleSubjectDTO.getSubjectOrder());
        scheduleSubject.setDay(scheduleSubjectDTO.getDay());
        scheduleSubject.setSubject(subject);
        scheduleSubject.setClassSchedule(classSchedule);


        return scheduleSubjectDAO.save(scheduleSubject);
    }

    @Override
    public ScheduleSubject updateScheduleSubject(Integer id, ScheduleSubjectDTO scheduleSubjectDTO) {
        ScheduleSubject existingScheduleSubject = scheduleSubjectDAO.findById(id)
                .orElseThrow(() -> new RuntimeException("ScheduleSubject not found"));

        Subject subject = subjectDAO.findById(scheduleSubjectDTO.getSubjectId())
                .orElseThrow(() -> new RuntimeException("Subject not found"));
        ClassSchedule classSchedule = classScheduleDAO.findById(scheduleSubjectDTO.getClassScheduleId())
                .orElseThrow(() -> new RuntimeException("ClassSchedule not found"));

        existingScheduleSubject.setSubjectOrder(scheduleSubjectDTO.getSubjectOrder());
        existingScheduleSubject.setDay(scheduleSubjectDTO.getDay());
        existingScheduleSubject.setSubject(subject);
        existingScheduleSubject.setClassSchedule(classSchedule);

        return scheduleSubjectDAO.save(existingScheduleSubject);
    }

    @Override
    public List<ScheduleSubject> getScheduleSubjectsByClassScheduleId(Integer classScheduleId) {
        return scheduleSubjectDAO.findByClassSchedule_ClassScheduleId(classScheduleId);
    }
}
