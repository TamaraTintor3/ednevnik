package com.example.ednevnikbackend.services;

import com.example.ednevnikbackend.dtos.AddTeachingDTO;
import com.example.ednevnikbackend.dtos.ProfessorDTO;
import com.example.ednevnikbackend.dtos.TeachingDTO;
import com.example.ednevnikbackend.models.Teaching;

import java.util.List;

public interface TeachingService {
    List<Teaching> getByClassIdProfId(Integer classId, Integer profId);

    TeachingDTO addTeaching(AddTeachingDTO req);



    List<ProfessorDTO> getAllBySchoolClassId(Integer schoolClassId);
}
