package com.example.ednevnikbackend.services;

import com.example.ednevnikbackend.dtos.SubjectDTO;

public interface SubjectService {

    public SubjectDTO getSubjectByProfessorId(Integer id);

}
