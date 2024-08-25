package com.example.ednevnikbackend.services;

import com.example.ednevnikbackend.dtos.ClassProfessorDTO;
import com.example.ednevnikbackend.dtos.ProfessorDTO;
import com.example.ednevnikbackend.dtos.SchoolClassDTO;

import java.util.List;

public interface ProfessorService {

    public ProfessorDTO getProfessorByUserId(Integer id);
    SchoolClassDTO getProfessorsSchoolClass(ClassProfessorDTO classProfessorDTO);
    List<ProfessorDTO> getAllProfessors();

    ProfessorDTO getProfessorById(Integer id);

    List<ProfessorDTO> getProfessorsWithoutSubject();
}
