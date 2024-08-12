package com.example.ednevnikbackend.services;


import com.example.ednevnikbackend.dtos.SchoolClassDTO;

import java.util.List;

public interface SchoolClassService {
    List<SchoolClassDTO> findAllSchoolClasses();
    SchoolClassDTO findSchoolClassById(Integer id);



}
