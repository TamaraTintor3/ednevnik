package com.example.ednevnikbackend.services.impl;


import com.example.ednevnikbackend.daos.SubjectDAO;
import com.example.ednevnikbackend.dtos.SubjectDTO;
import com.example.ednevnikbackend.services.SubjectService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SubjectServiceImpl implements SubjectService {


    @Autowired
    private SubjectDAO subjectDAO;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public SubjectDTO getSubjectByProfessorId(Integer id) {
        return modelMapper.map(subjectDAO.findByProfessor_ProfessorId(id),SubjectDTO.class);
    }
}
