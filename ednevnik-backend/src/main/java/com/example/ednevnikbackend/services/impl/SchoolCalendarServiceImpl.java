package com.example.ednevnikbackend.services.impl;

import com.example.ednevnikbackend.daos.SchoolCalendarDAO;
import com.example.ednevnikbackend.dtos.NewSchoolCalendarEventDTO;
import com.example.ednevnikbackend.dtos.SchoolCalendarDTO;
import com.example.ednevnikbackend.exceptions.NotFoundException;
import com.example.ednevnikbackend.models.SchoolCalendar;
import com.example.ednevnikbackend.services.SchoolCalendarService;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
public class SchoolCalendarServiceImpl implements SchoolCalendarService {
    @Autowired
    private SchoolCalendarDAO schoolCalendarDAO;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public List<SchoolCalendarDTO> getSchoolCalendarEventsByProfessorId(Integer id) {
        return schoolCalendarDAO.findAllByProfessor_ProfessorId(id).stream().map((event)->modelMapper.map(event,SchoolCalendarDTO.class)).toList();
    }

    @Override
    public SchoolCalendarDTO insertSchoolCalendarEvent(NewSchoolCalendarEventDTO newSchoolCalendarEventDTO) {
        SchoolCalendar schoolCalendar=modelMapper.map(newSchoolCalendarEventDTO,SchoolCalendar.class);
        schoolCalendar.setSchoolCalendarId(null);
        schoolCalendar=schoolCalendarDAO.saveAndFlush(schoolCalendar);
        entityManager.refresh(schoolCalendar);
        return modelMapper.map(schoolCalendar,SchoolCalendarDTO.class);
    }

    @Override
    public SchoolCalendarDTO updateSchoolCalendarEvent(Integer schoolCalendarId, NewSchoolCalendarEventDTO newSchoolCalendarEventDTO) {
        SchoolCalendar schoolCalendar=modelMapper.map(newSchoolCalendarEventDTO,SchoolCalendar.class);
        schoolCalendar.setSchoolCalendarId(schoolCalendarId);
        schoolCalendar=schoolCalendarDAO.saveAndFlush(schoolCalendar);
        entityManager.refresh(schoolCalendar);
        return modelMapper.map(schoolCalendar,SchoolCalendarDTO.class);
    }

    @Override
    public void deleteSchoolCalendarEvent(Integer schoolCalendarId) {
        SchoolCalendar schoolCalendar=schoolCalendarDAO.findById(schoolCalendarId).orElseThrow(NotFoundException::new);
        schoolCalendarDAO.delete(schoolCalendar);
    }
}
