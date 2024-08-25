package com.example.ednevnikbackend.services;

import com.example.ednevnikbackend.dtos.AddSubjectDTO;
import com.example.ednevnikbackend.dtos.SubjectDTO;
import com.example.ednevnikbackend.models.Subject;

import java.util.List;

import java.util.List;

import java.util.List;

public interface SubjectService {

    public SubjectDTO getSubjectByProfessorId(Integer id);
    List<Subject> getAllSubjects();

    public List<SubjectDTO> getAll();

    SubjectDTO addSubject(AddSubjectDTO addSubjectDTO);
}
