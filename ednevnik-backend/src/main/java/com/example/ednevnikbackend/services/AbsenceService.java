package com.example.ednevnikbackend.services;

import com.example.ednevnikbackend.dtos.AbsenceDTO;
import com.example.ednevnikbackend.dtos.AbsenceUpdateDTO;
import com.example.ednevnikbackend.models.Absence;

import java.util.List;

public interface AbsenceService {
    Absence addAbsence(AbsenceDTO absenceDTO);
    Absence updateAbsence(Integer absenceId, AbsenceUpdateDTO absenceUpdateDTO);
    List<Absence> getAbsencesByStudentId(Integer studentId);
    List<AbsenceDTO> getAbsencesForParent(Integer parentId);
}
