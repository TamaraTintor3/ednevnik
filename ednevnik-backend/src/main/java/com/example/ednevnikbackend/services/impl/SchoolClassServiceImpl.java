package com.example.ednevnikbackend.services.impl;

import com.example.ednevnikbackend.daos.SchoolClassDAO;
import com.example.ednevnikbackend.dtos.SchoolClassDTO;
import com.example.ednevnikbackend.services.SchoolClassService;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
public class SchoolClassServiceImpl implements SchoolClassService {
    @Autowired
    private SchoolClassDAO schoolClassDAO;
    @Autowired
    private ModelMapper modelMapper;
    @Override
    public List<SchoolClassDTO> findAllSchoolClasses() {
        return schoolClassDAO.findAll().stream().map(e->modelMapper.map(e,SchoolClassDTO.class)).toList();
    }

    @Override
    public SchoolClassDTO findSchoolClassById(Integer id) {
        return modelMapper.map(schoolClassDAO.findById(id), SchoolClassDTO.class);
    }
}
