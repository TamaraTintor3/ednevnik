package com.example.ednevnikbackend.services.impl;

import com.example.ednevnikbackend.daos.ProfessorDAO;
import com.example.ednevnikbackend.dtos.ClassProfessorDTO;
import com.example.ednevnikbackend.dtos.ProfessorDTO;
import com.example.ednevnikbackend.dtos.SchoolClassDTO;
import com.example.ednevnikbackend.services.ProfessorService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

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

    @Override
    public SchoolClassDTO getProfessorsSchoolClass(ClassProfessorDTO classProfessorDTO) {
        return modelMapper.map(professorDAO.getProfessorByUser_UserId(classProfessorDTO.getUserId()).getSchoolClass(),SchoolClassDTO.class);
    }

    @Override
    public List<ProfessorDTO> getAllProfessors() {
        return professorDAO.findAll().stream().map((professor)->modelMapper.map(professor,ProfessorDTO.class)).toList();
    }
}
