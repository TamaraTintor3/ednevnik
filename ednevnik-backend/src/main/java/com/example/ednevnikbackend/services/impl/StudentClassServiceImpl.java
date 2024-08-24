package com.example.ednevnikbackend.services.impl;

import com.example.ednevnikbackend.daos.SchoolClassDAO;
import com.example.ednevnikbackend.daos.StudentClassDAO;
import com.example.ednevnikbackend.daos.StudentDAO;
import com.example.ednevnikbackend.dtos.StudentClassDTO;
import com.example.ednevnikbackend.models.Absence;
import com.example.ednevnikbackend.models.SchoolYear;
import com.example.ednevnikbackend.models.StudentClass;
import com.example.ednevnikbackend.services.SchoolClassService;
import com.example.ednevnikbackend.services.StudentClassService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class StudentClassServiceImpl implements StudentClassService {

    @Autowired
    StudentClassDAO studentClassDAO;

    @Autowired
    StudentDAO studentDAO;

    @Autowired
    SchoolClassDAO schoolClassDAO;
    @Autowired
    private SchoolClassService schoolClassService;

    @Override
    public StudentClass addStudentClass(StudentClassDTO studentClassDTO) {
        StudentClass studentClass = new StudentClass();
        studentClass.setStudent(studentDAO.findById(studentClassDTO.getStudentId())
                .orElseThrow(() -> new RuntimeException("Student not found")));
        studentClass.setSchoolClass(schoolClassDAO.findById(studentClassDTO.getSchoolClassId())
                .orElseThrow(() -> new RuntimeException("School class not found")));
        studentClass.setBehavior(studentClassDTO.getBehavior());
        studentClass.setFinalGrade(studentClassDTO.getFinalGrade());
        return studentClassDAO.save(studentClass);
    }

    @Override
    public StudentClass updateStudentClass(Integer id, StudentClassDTO studentClassDTO) {
        StudentClass studentClass = studentClassDAO.findById(id)
                .orElseThrow(() -> new RuntimeException("Student class not found"));
        studentClass.setBehavior(studentClassDTO.getBehavior());
        studentClass.setFinalGrade(studentClassDTO.getFinalGrade());
        return studentClassDAO.save(studentClass);
    }

    @Override
    public List<StudentClass> getStudentClssByStudentId(Integer studentId){
        return studentClassDAO.findByStudentStudentId(studentId);
    }

    @Override
    public StudentClass getByParentIdAndSchoolYearId(Integer parentId) {
        SchoolYear schoolYear=schoolClassService.findCurrentSchoolYear();
        System.out.println(schoolYear.getYear()+" "+schoolYear.getSchoolYearId());
        return studentClassDAO.findByStudent_Parent_ParentIdAndSchoolClass_SchoolYear_SchoolYearId(parentId,schoolYear.getSchoolYearId());
    }


}
