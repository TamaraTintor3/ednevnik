package com.example.ednevnikbackend.services;

import com.example.ednevnikbackend.dtos.*;
import com.example.ednevnikbackend.models.Student;
import com.example.ednevnikbackend.models.SubjectGrades;

import java.util.List;
import java.util.Optional;

public interface StudentService {
    public List<AddStudentDTO> getStudentsByClassId(Integer classId);
    public AddStudentDTO addStudent(AddStudentDTO addStudentDTO);
    Optional<Student> findById(Integer studentId);
    StudentDetailsDTO getStudentDetails(Integer id);

    List<StudentGradesForParentDTO> getStudentGradesByParentIdDateDesc(Integer parentId, Integer schoolYearId);

    StudentDTO getStudentByParentId(Integer parentId);
}
