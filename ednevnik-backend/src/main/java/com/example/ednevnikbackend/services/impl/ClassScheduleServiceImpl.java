package com.example.ednevnikbackend.services.impl;

import com.example.ednevnikbackend.daos.*;
import com.example.ednevnikbackend.dtos.ClassScheduleDTO;
import com.example.ednevnikbackend.models.*;
import com.example.ednevnikbackend.services.ClassScheduleService;
import com.example.ednevnikbackend.services.SchoolClassService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class ClassScheduleServiceImpl implements ClassScheduleService {

    @Autowired
    ClassScheduleDAO classScheduleDAO;

    @Autowired
    SchoolClassDAO schoolClassDAO;

    @Autowired
    ParentDAO parentDAO;

    @Autowired
    StudentDAO studentDAO;

    @Autowired
    SchoolClassService schoolClassService;

    @Autowired
    ClassScheduleDAO scheduleDAO;


    @Override
    public ClassSchedule createClassSchedule(ClassScheduleDTO classScheduleDto) {
        Optional<ClassSchedule> existingClassSchedule = classScheduleDAO.findBySchoolClassSchoolClassId(classScheduleDto.getSchoolClassId());

        if (existingClassSchedule.isPresent()) {
            return existingClassSchedule.get();
        } else {

            Optional<SchoolClass> optionalSchoolClass = schoolClassDAO.findById(classScheduleDto.getSchoolClassId());

            if (!optionalSchoolClass.isPresent()) {
                throw new RuntimeException("SchoolClass not found");
            }

            SchoolClass schoolClass = optionalSchoolClass.get();

            ClassSchedule classSchedule = new ClassSchedule();
            classSchedule.setSchoolClass(schoolClass);

            return classScheduleDAO.save(classSchedule);
        }
    }

    @Override
    public Integer getClassScheduleIdForLoggedInParent(Integer userId) {
        Parent parent = parentDAO.findByUser_UserId(userId);

        List<Student> students = studentDAO.findAllByParent_ParentId(parent.getParentId());

        SchoolYear currentSchoolYear = schoolClassService.findCurrentSchoolYear();

        for (Student student : students) {
            SchoolClass schoolClass = student.getSchoolClass();
            if (schoolClass.getSchoolYear().equals(currentSchoolYear)) {
                ClassSchedule classSchedule = classScheduleDAO.findBySchoolClassSchoolClassId(schoolClass.getSchoolClassId())
                        .orElseThrow(() -> new RuntimeException("Raspored časova nije pronađen za dato odeljenje"));

                return classSchedule.getClassScheduleId();
            }
        }
        throw new RuntimeException("Nijedan učenik nije upisan u odeljenje za trenutnu školsku godinu");
    }
}
