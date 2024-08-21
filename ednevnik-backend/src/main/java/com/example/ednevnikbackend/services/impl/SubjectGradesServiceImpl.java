package com.example.ednevnikbackend.services.impl;

import com.example.ednevnikbackend.daos.*;
import com.example.ednevnikbackend.dtos.*;
import com.example.ednevnikbackend.models.*;
import com.example.ednevnikbackend.services.SchoolClassService;
import com.example.ednevnikbackend.services.SubjectGradesService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

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

    @Autowired
    private ModelMapper modelMapper;

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

    @Override
    public List<GradesDTO> getAllStudentGradesByYear(Integer schoolYearId, Integer studentId) {
        List<GradesDTO> response=new ArrayList<>();

        List<SubjectGrades> grades= subjectGradesDAO.getSubjectGradesBySchoolYear_SchoolYearIdAndStudent_StudentId(schoolYearId, studentId);
        Map<String,List<SubjectGrades>> map= grades.stream().collect(Collectors.groupingBy((g)->g.getSubject().getName()));
        for (Map.Entry<String,List<SubjectGrades>> entry : map.entrySet()) {
            List<SingleSubjectGradeDTO> gradesWritten=new ArrayList<>();
            List<SingleSubjectGradeDTO> gradesVerbal=new ArrayList<>();
            GradesDTO gradesDTO=new GradesDTO();
            entry.getValue().stream().forEach((grade)-> {
                if (grade.getDescription().equals(GradeDescription.PISMENI.toString()) && !grade.getFinalSubjectGrade()) {
                    gradesWritten.add(modelMapper.map(grade, SingleSubjectGradeDTO.class));
                } else if (grade.getDescription().equals(GradeDescription.USMENI.toString()) && !grade.getFinalSubjectGrade()) {
                    gradesVerbal.add(modelMapper.map(grade, SingleSubjectGradeDTO.class));
                }
                gradesDTO.setProfessorFullName(grade.getSubject().getProfessor().getUser().getFirstName()+" "+grade.getSubject().getProfessor().getUser().getFirstName());
            });
            gradesDTO.setGradesWritten(gradesWritten);
            gradesDTO.setGradesVerbal(gradesVerbal);
            gradesDTO.setSubjectName(entry.getKey());
            response.add(gradesDTO);
        }

        return response;
    }
}
