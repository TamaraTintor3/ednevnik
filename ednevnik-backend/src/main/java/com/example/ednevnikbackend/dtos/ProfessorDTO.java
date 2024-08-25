package com.example.ednevnikbackend.dtos;

import lombok.Data;

@Data
public class ProfessorDTO {
    private Integer professorId;
    private Boolean classProfessor;
    private String userFirstName;
    private String userLastName;
}
