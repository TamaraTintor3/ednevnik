package com.example.ednevnikbackend.dtos;


import com.example.ednevnikbackend.models.Professor;
import com.example.ednevnikbackend.models.SchoolYear;
import com.example.ednevnikbackend.models.Student;
import lombok.Data;

import java.util.List;

@Data
public class SchoolClassDTO {
    private Integer schoolClassId;
    private String name;
    private List<ProfessorDTO> professors;
    private String schoolYearYear;
    private String schoolYearSemester;
    private List<StudentDTO> students;

}
