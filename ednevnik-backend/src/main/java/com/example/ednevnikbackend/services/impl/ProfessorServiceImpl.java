package com.example.ednevnikbackend.services.impl;

import com.example.ednevnikbackend.daos.ProfessorDAO;
import com.example.ednevnikbackend.daos.SchoolClassDAO;
import com.example.ednevnikbackend.dtos.ClassProfessorDTO;
import com.example.ednevnikbackend.dtos.ProfessorDTO;
import com.example.ednevnikbackend.dtos.ProfessorInfoDTO;
import com.example.ednevnikbackend.dtos.SchoolClassDTO;
import com.example.ednevnikbackend.models.Professor;
import com.example.ednevnikbackend.services.ProfessorService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProfessorServiceImpl implements ProfessorService {

    @Autowired
    private ProfessorDAO professorDAO;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    SchoolClassDAO schoolClassDAO;

    @Override
    public ProfessorDTO getProfessorByUserId(Integer id) {
        return modelMapper.map(professorDAO.getProfessorByUser_UserId(id),ProfessorDTO.class);
    }

    @Override
    public SchoolClassDTO getProfessorsSchoolClass(ClassProfessorDTO classProfessorDTO) {
        return modelMapper.map(professorDAO.getProfessorByUser_UserId(classProfessorDTO.getUserId()).getSchoolClass(),SchoolClassDTO.class);
    }

    @Override

    public List<ProfessorDTO> getAllProfessors() {
        return professorDAO.findAll().stream().map((professor) -> modelMapper.map(professor, ProfessorDTO.class)).toList();
    }
    @Override
    public ProfessorInfoDTO getClassProfessorBySchoolClassId(Integer schoolClassId) {
        Professor classProfessor = schoolClassDAO.findById(schoolClassId)
                .orElseThrow(() -> new IllegalArgumentException("SchoolClass not found with id: " + schoolClassId))
                .getProfessors().stream()
                .filter(Professor::getClassProfessor)
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("No class professor found for SchoolClass with id: " + schoolClassId));


        ProfessorInfoDTO professorInfoDTO = new ProfessorInfoDTO();
        professorInfoDTO.setProfessorId(classProfessor.getProfessorId());
        professorInfoDTO.setFirstName(classProfessor.getUser().getFirstName());
        professorInfoDTO.setLastName(classProfessor.getUser().getLastName());
        professorInfoDTO.setUsername(classProfessor.getUser().getUsername());
        professorInfoDTO.setClassProfessor(classProfessor.getClassProfessor());

        return professorInfoDTO;

    }

    @Override
    public ProfessorDTO getProfessorById(Integer id) {
        return modelMapper.map(professorDAO.findByProfessorId(id), ProfessorDTO.class);
    }

    @Override
    public List<ProfessorDTO> getProfessorsWithoutSubject(){
        return professorDAO.getProfessorsBySubjectsEmpty().stream().map(el -> modelMapper.map(el,ProfessorDTO.class)).collect(Collectors.toList());
    }

    @Override
    public ProfessorDTO getProfessorById(Integer id) {
        return modelMapper.map(professorDAO.findByProfessorId(id), ProfessorDTO.class);
    }

    @Override
    public List<ProfessorDTO> getProfessorsWithoutSubject(){
        return professorDAO.getProfessorsBySubjectsEmpty().stream().map(el -> modelMapper.map(el,ProfessorDTO.class)).collect(Collectors.toList());
    }
}

