package com.example.ednevnikbackend.services.impl;

import com.example.ednevnikbackend.daos.*;
import com.example.ednevnikbackend.dtos.AddSubjectGradesDTO;
import com.example.ednevnikbackend.dtos.ParentInfoDTO;
import com.example.ednevnikbackend.dtos.StudentSubjectGradesDTO;
import com.example.ednevnikbackend.dtos.SubjectGradesDTO;
import com.example.ednevnikbackend.models.SchoolYear;
import com.example.ednevnikbackend.models.Student;
import com.example.ednevnikbackend.models.Subject;
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
    private StudentDAO studentDAO;

    @Autowired
    private SchoolYearDAO schoolYearDAO;

    @Autowired
    private SubjectDAO subjectDAO;

    @Autowired
    private SchoolClassService schoolClassService;

    @Autowired
    private ModelMapper mapper;

    @Autowired
    private SchoolClassDAO schoolClassDAO;

    @Override
    public List<StudentSubjectGradesDTO> getAllStudentGradesByStudentIdAndProfessorId(Integer schoolClassId, Integer professorId) {

        List<StudentSubjectGradesDTO> resultList = new ArrayList<>();
        List<Student> students = schoolClassDAO.findById(schoolClassId).get().getStudents();
        SchoolYear schoolYear = schoolClassDAO.findById(schoolClassId).get().getSchoolYear();
        List<SubjectGradesDTO> writtenGrades = new ArrayList<>();
        List<SubjectGradesDTO> verbalGrades = new ArrayList<>();
        StudentSubjectGradesDTO sddto = new StudentSubjectGradesDTO();
        for (Student stud : students) {
            sddto.setStudentId(stud.getStudentId());

            sddto.setParent(mapper.map(stud.getParent(), ParentInfoDTO.class));

            sddto.setFirstName(stud.getFirstName());
            sddto.setLastName(stud.getLastName());

            if (!stud.getSubjectGrades().isEmpty())
                for (SubjectGrades sg : stud.getSubjectGrades()) {
                    if ((sg.getSubject().getProfessor().getProfessorId()).equals(professorId) && sg.getSchoolYear().getSchoolYearId() == schoolYear.getSchoolYearId()) {
                        if (sg.getDescription().equals("PISMENI")) {
                            writtenGrades.add(mapper.map(sg, SubjectGradesDTO.class));
                        } else if (sg.getDescription().equals("USMENI")) {
                            verbalGrades.add(mapper.map(sg, SubjectGradesDTO.class));
                        }
                    }
                    sddto.setGradesWritten(writtenGrades);
                    sddto.setGradesVerbal(verbalGrades);
                }
            writtenGrades = new ArrayList<>();
            verbalGrades = new ArrayList<>();
            resultList.add(sddto);
            sddto = new StudentSubjectGradesDTO();

        }


        for (StudentSubjectGradesDTO sgd : resultList) {
            System.out.println(sgd.getFirstName());
        }
        return resultList;
    }


    @Override
    public SubjectGradesDTO addGrade(AddSubjectGradesDTO req) {

        SubjectGrades sg = new SubjectGrades();
        Student student = studentDAO.findByStudentId(req.getStudentId());
        SchoolYear schoolYear = schoolYearDAO.findBySchoolYearId(req.getSchoolYearId());
        Subject subject = subjectDAO.findBySubjectId(req.getSubjectId());
        sg.setGrade(req.getGrade());
        sg.setSubject(subject);
        sg.setFinalSubjectGrade(req.getFinalSubjectGrade());
        sg.setDate(req.getDate());
        sg.setDescription(req.getDescription());
        sg.setStudent(student);
        sg.setSchoolYear(schoolYear);
        // sg = mapper.map(req,SubjectGrades.class);
        return mapper.map(subjectGradesDAO.save(sg), SubjectGradesDTO.class);

    }


    @Override
    public SubjectGradesDTO editGrade(Integer id,  AddSubjectGradesDTO grade){

        if(!subjectGradesDAO.existsById(id)){
            return null;
        }

        SubjectGrades subjectGrades = mapper.map(grade, SubjectGrades.class);
        subjectGrades.setSubjectGradesId(id);
        subjectGrades = subjectGradesDAO.saveAndFlush(subjectGrades);
        return mapper.map(subjectGrades,SubjectGradesDTO.class);
    }

}
