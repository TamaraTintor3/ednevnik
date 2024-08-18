package com.example.ednevnikbackend.dtos;

import com.example.ednevnikbackend.models.Message;
import com.example.ednevnikbackend.models.SchoolClass;
import com.example.ednevnikbackend.models.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
public class ClassProfessorDTO {
    private Integer userId;
}
