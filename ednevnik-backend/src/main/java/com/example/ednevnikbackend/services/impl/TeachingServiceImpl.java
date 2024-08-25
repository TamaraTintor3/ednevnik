package com.example.ednevnikbackend.services.impl;

import com.example.ednevnikbackend.daos.ProfessorDAO;
import com.example.ednevnikbackend.daos.SchoolClassDAO;
import com.example.ednevnikbackend.daos.TeachingDAO;
import com.example.ednevnikbackend.dtos.AddTeachingDTO;
import com.example.ednevnikbackend.dtos.ProfessorDTO;
import com.example.ednevnikbackend.dtos.TeachingDTO;
import com.example.ednevnikbackend.models.SchoolClass;
import com.example.ednevnikbackend.models.Teaching;
import com.example.ednevnikbackend.services.TeachingService;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class TeachingServiceImpl implements TeachingService {


    @Autowired
    private TeachingDAO teachingDAO;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private SchoolClassDAO schoolClassDAO;

    @Autowired
    private ProfessorDAO professorDAO;

    @Override
    public List<Teaching> getByClassIdProfId(Integer classId, Integer profId){
return null;
    }


    @Override
    public TeachingDTO addTeaching(AddTeachingDTO req){
        Teaching teaching = new Teaching();
        SchoolClass schoolClass = schoolClassDAO.findBySchoolClassId(req.getSchoolClassId());
        teaching.setProfessorId(req.getProfessorId());
        teaching.setSchoolClass(schoolClass);
        return modelMapper.map(teachingDAO.save(teaching), TeachingDTO.class);

    }



    @Override
    public List<ProfessorDTO> getAllBySchoolClassId(Integer schoolClassId){

        List<ProfessorDTO> list = new ArrayList<>();
        List<Teaching> teachings = teachingDAO.findAllBySchoolClassSchoolClassId(schoolClassId);

        if(!teachings.isEmpty())
        for(Teaching t : teachings){
            list.add(modelMapper.map(professorDAO.findByProfessorId(t.getProfessorId()),ProfessorDTO.class));
        }
        return list;
    }
}
