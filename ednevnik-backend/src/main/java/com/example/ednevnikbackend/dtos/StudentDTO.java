package com.example.ednevnikbackend.dtos;

import lombok.Data;

@Data
public class StudentDTO {
    private Integer studentId;
    private String firstName;
    private String lastName;
    private ParentInfoDTO parent;
}
