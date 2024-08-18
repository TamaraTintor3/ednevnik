package com.example.ednevnikbackend.services.impl;

import com.example.ednevnikbackend.daos.AbsenceDAO;
import com.example.ednevnikbackend.dtos.AbsenceDTO;
import com.example.ednevnikbackend.models.Absence;
import com.example.ednevnikbackend.models.Student;
import com.example.ednevnikbackend.services.AbsenceService;
import com.example.ednevnikbackend.services.StudentService;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class AbsenceServiceImpl implements AbsenceService {

    @Autowired
    AbsenceDAO absenceDAO;

    @Autowired
    StudentService studentService;

    @Autowired
    ModelMapper modelMapper;

    @Override
    public Absence addAbsence(AbsenceDTO absenceDTO) {
        Student student = studentService.findById(absenceDTO.getStudentId())
                .orElseThrow(() -> new RuntimeException("Student not found"));

        Absence absence = new Absence();
        absence.setDateOfAbsence(absenceDTO.getDateOfAbsence());
        absence.setNumberOfClasses(absenceDTO.getNumberOfClasses());
        absence.setApproved(absenceDTO.getApproved());
        absence.setStudent(student);

        return absenceDAO.save(absence);

    }
}
