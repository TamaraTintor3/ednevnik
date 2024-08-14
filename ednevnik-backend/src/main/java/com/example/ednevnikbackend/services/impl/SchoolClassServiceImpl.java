package com.example.ednevnikbackend.services.impl;

import com.example.ednevnikbackend.daos.SchoolClassDAO;
import com.example.ednevnikbackend.daos.TeachingDAO;
import com.example.ednevnikbackend.daos.SchoolYearDAO;
import com.example.ednevnikbackend.dtos.AddSchoolClassDTO;
import com.example.ednevnikbackend.dtos.SchoolClassDTO;
import com.example.ednevnikbackend.models.Teaching;
import com.example.ednevnikbackend.models.SchoolClass;
import com.example.ednevnikbackend.models.SchoolYear;
import com.example.ednevnikbackend.services.SchoolClassService;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class SchoolClassServiceImpl implements SchoolClassService {
    @Autowired
    private SchoolClassDAO schoolClassDAO;
    @Autowired
    private SchoolYearDAO schoolYearDAO;
    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    private TeachingDAO teachingDAO;
    @Override
    public List<SchoolClassDTO> findAllSchoolClasses() {
        return schoolClassDAO.findAll().stream().map(e->modelMapper.map(e,SchoolClassDTO.class)).toList();
    }

    @Override
    public SchoolClassDTO findSchoolClassById(Integer id) {
        return modelMapper.map(schoolClassDAO.findById(id), SchoolClassDTO.class);

    }

    @Override
    public SchoolClass addSchoolClass(AddSchoolClassDTO addSchoolClassDTO) {
        SchoolYear currentSchoolYear = findCurrentSchoolYear();
        SchoolClass schoolClass = new SchoolClass();
        schoolClass.setName(addSchoolClassDTO.getName());
        schoolClass.setSchoolYear(currentSchoolYear);

        return  schoolClassDAO.save(schoolClass);
    }

    @Override
    public SchoolYear findCurrentSchoolYear() {
        List<SchoolYear> schoolYears = schoolYearDAO.findAllByOrderByYearDescSemesterDesc();

        if (schoolYears.isEmpty()){
            throw new RuntimeException("Trenutna školska godina nije pronađena");

        }

        SchoolYear latestYear = schoolYears.get(0);

        List<SchoolYear> currentYearSemesters = schoolYearDAO.findByYearOrderBySemesterDesc(latestYear.getYear());

        if (currentYearSemesters.isEmpty()) {
            throw new RuntimeException("Polugodišta za trenutnu školsku godinu nisu pronađena");
        }

        return currentYearSemesters.get(0);
    }

    @Override
    public List<SchoolClassDTO> findAllClassesByProfessorId(Integer id) {

        List<Teaching> teachings = teachingDAO.findAllByProfessorId(id);
        List<SchoolClassDTO> classes = new ArrayList<SchoolClassDTO>();
        for(Teaching t : teachings){
            classes.add(modelMapper.map(t.getSchoolClass(),SchoolClassDTO.class));
        }
        return classes;
    }
}
