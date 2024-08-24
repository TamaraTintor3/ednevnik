package com.example.ednevnikbackend.services;

import com.example.ednevnikbackend.dtos.StudentClassDTO;
import com.example.ednevnikbackend.models.Absence;
import com.example.ednevnikbackend.models.StudentClass;

import java.util.List;
import java.util.Optional;

public interface StudentClassService {
    StudentClass addStudentClass(StudentClassDTO studentClassDTO);
    StudentClass updateStudentClass(Integer id, StudentClassDTO studentClassDTO);
    List<StudentClass> getStudentClssByStudentId(Integer studentId);

    StudentClass getByParentIdAndSchoolYearId(Integer parentId);

    List<StudentClassDTO> getStudentClassesByParentId(Integer parentId);

}
