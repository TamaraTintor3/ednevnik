package com.example.ednevnikbackend.services.impl;

import com.example.ednevnikbackend.daos.SchoolClassDAO;
import com.example.ednevnikbackend.daos.SubjectGradesDAO;
import com.example.ednevnikbackend.dtos.ParentInfoDTO;
import com.example.ednevnikbackend.dtos.StudentDTO;
import com.example.ednevnikbackend.dtos.StudentSubjectGradesDTO;
import com.example.ednevnikbackend.dtos.SubjectGradesDTO;
import com.example.ednevnikbackend.models.Student;
import com.example.ednevnikbackend.models.SubjectGrades;
import com.example.ednevnikbackend.services.SchoolClassService;
import com.example.ednevnikbackend.services.SubjectGradesService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class SubjectGradesServiceImpl implements SubjectGradesService {


    @Autowired
    private SubjectGradesDAO subjectGradesDAO;

    @Autowired
    private SchoolClassService schoolClassService;

    @Autowired
    private ModelMapper mapper;

    @Autowired
    private SchoolClassDAO schoolClassDAO;

    @Override
    public List<StudentSubjectGradesDTO> getAllStudentGradesByStudentIdAndProfessorId(Integer schoolClassId, Integer professorId) {

        List<StudentSubjectGradesDTO> resultList = new ArrayList<>();
       List<Student> students =  schoolClassDAO.findById(schoolClassId).get().getStudents();
        List<SubjectGradesDTO> writtenGrades = new ArrayList<>();
        List<SubjectGradesDTO> verbalGrades = new ArrayList<>();

        StudentSubjectGradesDTO sddto = new StudentSubjectGradesDTO();
        for(Student stud: students){
System.out.println(stud.getFirstName());
            sddto.setStudentId(stud.getStudentId());

            sddto.setParent(mapper.map(stud.getParent(), ParentInfoDTO.class));

            sddto.setFirstName(stud.getFirstName());
            sddto.setLastName(stud.getLastName());

            if(!stud.getSubjectGrades().isEmpty())
            for(SubjectGrades sg : stud.getSubjectGrades()){
                if((sg.getSubject().getProfessor().getProfessorId()).equals(professorId)){
                    if(sg.getDescription().equals("PISMENI")){
                        writtenGrades.add(mapper.map(sg,SubjectGradesDTO.class));
                    }else if(sg.getDescription().equals("USMENI")){
                        verbalGrades.add(mapper.map(sg,SubjectGradesDTO.class));
                    }
                }
                sddto.setGradesWritten(writtenGrades);
                sddto.setGradesVerbal(verbalGrades);
            }
           writtenGrades = new ArrayList<>();
            verbalGrades = new ArrayList<>();
System.out.println("---" + sddto.getFirstName());
            resultList.add(sddto);
            sddto=new StudentSubjectGradesDTO();

        }


        for(StudentSubjectGradesDTO sgd:resultList){
         System.out.println(   sgd.getFirstName());
        }
        return resultList;
    }
}
