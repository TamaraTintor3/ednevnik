package com.example.ednevnikbackend.dtos;

import lombok.Data;

import java.util.List;

@Data
public class SubjectDTO {


    private Integer subjectId;

    private String name;

    private ProfessorDTO professor;


}
