package com.example.ednevnikbackend.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class StudentClassDTO {
    private Integer studentClassId;
    private Integer studentStudentId;
    private Integer schoolClassId;
    private Integer schoolClassSchoolYearId;
    private Integer schoolClassSchoolYearSemester;
    private String schoolClassSchoolYearYear;
    private String schoolClassName;
    private String behavior;
    private Double finalGrade;
}
