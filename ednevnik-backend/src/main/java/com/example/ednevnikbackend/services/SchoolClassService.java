package com.example.ednevnikbackend.services;


import com.example.ednevnikbackend.dtos.AddSchoolClassDTO;
import com.example.ednevnikbackend.dtos.SchoolClassDTO;
import com.example.ednevnikbackend.models.SchoolClass;
import com.example.ednevnikbackend.models.SchoolYear;

import java.util.List;

public interface SchoolClassService {
    List<SchoolClassDTO> findAllSchoolClasses();
    SchoolClassDTO findSchoolClassById(Integer id);
    public SchoolClass addSchoolClass (AddSchoolClassDTO addSchoolClassDTO);
    public SchoolYear findCurrentSchoolYear();

}
