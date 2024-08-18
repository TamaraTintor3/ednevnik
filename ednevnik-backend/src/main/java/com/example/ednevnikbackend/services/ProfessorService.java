package com.example.ednevnikbackend.services;

import com.example.ednevnikbackend.dtos.ClassProfessorDTO;
import com.example.ednevnikbackend.dtos.ProfessorDTO;
import com.example.ednevnikbackend.dtos.SchoolClassDTO;

public interface ProfessorService {

    public ProfessorDTO getProfessorByUserId(Integer id);
    SchoolClassDTO getProfessorsSchoolClass(ClassProfessorDTO classProfessorDTO);
}
