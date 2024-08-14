package com.example.ednevnikbackend.services.impl;

import com.example.ednevnikbackend.daos.ProfessorDAO;
import com.example.ednevnikbackend.dtos.ProfessorDTO;
import com.example.ednevnikbackend.services.ProfessorService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProfessorServiceImpl implements ProfessorService {

    @Autowired
    private ProfessorDAO professorDAO;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public ProfessorDTO getProfessorByUserId(Integer id) {
        return modelMapper.map(professorDAO.getProfessorByUser_UserId(id),ProfessorDTO.class);
    }
}
