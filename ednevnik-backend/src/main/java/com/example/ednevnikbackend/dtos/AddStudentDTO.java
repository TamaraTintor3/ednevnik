package com.example.ednevnikbackend.dtos;

import lombok.Data;

@Data
public class AddStudentDTO {
    private Integer studentId;
    private String firstName;
    private String lastName;
    private String jmbg;
    private Integer schoolClassId;
    private Integer parentId;
}
