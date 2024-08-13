package com.example.ednevnikbackend.dtos;

import com.example.ednevnikbackend.models.Message;
import com.example.ednevnikbackend.models.Student;
import com.example.ednevnikbackend.models.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.Data;

import java.util.List;

@Data
public class ParentInfoDTO {
    private Integer parentId;
    private String userFirstName;
    private String userLastName;
}
