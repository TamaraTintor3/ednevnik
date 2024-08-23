package com.example.ednevnikbackend.services.impl;

import com.example.ednevnikbackend.daos.ClassScheduleDAO;
import com.example.ednevnikbackend.daos.SchoolClassDAO;
import com.example.ednevnikbackend.dtos.ClassScheduleDTO;
import com.example.ednevnikbackend.models.ClassSchedule;
import com.example.ednevnikbackend.models.SchoolClass;
import com.example.ednevnikbackend.services.ClassScheduleService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@Transactional
public class ClassScheduleServiceImpl implements ClassScheduleService {

    @Autowired
    ClassScheduleDAO classScheduleDAO;

    @Autowired
    SchoolClassDAO schoolClassDAO;

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
}
