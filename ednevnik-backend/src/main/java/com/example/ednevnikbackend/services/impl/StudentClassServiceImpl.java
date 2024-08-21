package com.example.ednevnikbackend.services.impl;

import com.example.ednevnikbackend.daos.SchoolClassDAO;
import com.example.ednevnikbackend.daos.StudentClassDAO;
import com.example.ednevnikbackend.daos.StudentDAO;
import com.example.ednevnikbackend.dtos.StudentClassDTO;
import com.example.ednevnikbackend.models.Absence;
import com.example.ednevnikbackend.models.StudentClass;
import com.example.ednevnikbackend.services.StudentClassService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
public class StudentClassServiceImpl implements StudentClassService {

    @Autowired
    StudentClassDAO studentClassDAO;

    @Autowired
    StudentDAO studentDAO;

    @Autowired
    SchoolClassDAO schoolClassDAO;

    @Override
    public StudentClass saveOrUpdateStudentClass(StudentClassDTO studentClassDTO) {

        StudentClass studentClass;

        if (studentClassDTO.getStudentClassId() != null) {
            studentClass = studentClassDAO.findById(studentClassDTO.getStudentClassId())
                    .orElseThrow(() -> new RuntimeException("Student class not found"));
            studentClass.setBehavior(studentClassDTO.getBehavior());
            studentClass.setFinalGrade(studentClassDTO.getFinalGrade());
        } else {
            studentClass = new StudentClass();
            studentClass.setStudent(studentDAO.findById(studentClassDTO.getStudentId())
                    .orElseThrow(() -> new RuntimeException("Student not found")));
            studentClass.setSchoolClass(schoolClassDAO.findById(studentClassDTO.getSchoolClassId())
                    .orElseThrow(() -> new RuntimeException("School class not found")));
            studentClass.setBehavior(studentClassDTO.getBehavior());
            studentClass.setFinalGrade(studentClassDTO.getFinalGrade());
        }

        return studentClassDAO.save(studentClass);
    }


    public List<StudentClass> getStudentClassByStudentId(Integer studentId) {
        return studentClassDAO.findByStudentStudentId(studentId);

    }

}
