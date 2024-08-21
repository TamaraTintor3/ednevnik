package com.example.ednevnikbackend.dtos;

import lombok.Data;

@Data
public class StudentDetailsDTO {
    private Integer studentId;
    private String firstName;
    private String lastName;
    private ParentInfoDTO parent;
    private String jmbg;

}
