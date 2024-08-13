package com.example.ednevnikbackend.dtos;

import com.example.ednevnikbackend.models.*;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
public class ProfessorDTO {
    private Integer professorId;
    private Boolean classProfessor;
    private String userFirstName;
    private String userLastName;

}
