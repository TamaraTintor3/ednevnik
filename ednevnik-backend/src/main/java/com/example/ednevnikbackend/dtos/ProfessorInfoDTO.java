package com.example.ednevnikbackend.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProfessorInfoDTO {
    private Integer professorId;
    private String firstName;
    private String lastName;
    private String username;
    private Boolean classProfessor;
}
