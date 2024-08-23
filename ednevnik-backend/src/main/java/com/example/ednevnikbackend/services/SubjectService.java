package com.example.ednevnikbackend.services;

import com.example.ednevnikbackend.dtos.SubjectDTO;

import java.util.List;

public interface SubjectService {

    public SubjectDTO getSubjectByProfessorId(Integer id);

    public List<SubjectDTO> getAll();
}
