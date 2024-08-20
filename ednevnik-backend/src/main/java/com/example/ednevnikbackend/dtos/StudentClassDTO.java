package com.example.ednevnikbackend.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class StudentClassDTO {
    private Integer studentClassId;
    private Integer studentId;
    private Integer schoolClassId;
    private String behavior;
    private Double finalGrade;
}
