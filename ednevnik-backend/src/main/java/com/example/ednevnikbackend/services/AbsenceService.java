package com.example.ednevnikbackend.services;

import com.example.ednevnikbackend.dtos.AbsenceDTO;
import com.example.ednevnikbackend.models.Absence;

public interface AbsenceService {
    Absence addAbsence(AbsenceDTO absenceDTO);
}
