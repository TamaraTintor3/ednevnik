package com.example.ednevnikbackend.services.impl;

import com.example.ednevnikbackend.daos.ParentDAO;
import com.example.ednevnikbackend.daos.SchoolClassDAO;
import com.example.ednevnikbackend.daos.StudentDAO;
import com.example.ednevnikbackend.daos.SubjectGradesDAO;
import com.example.ednevnikbackend.dtos.*;
import com.example.ednevnikbackend.models.Parent;
import com.example.ednevnikbackend.models.SchoolClass;
import com.example.ednevnikbackend.models.Student;
import com.example.ednevnikbackend.services.StudentService;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class StudentServiceImpl implements StudentService {

    @Autowired
    private StudentDAO studentDAO;

    @Autowired
    private ParentDAO parentDAO;

    @Autowired
    private SchoolClassDAO schoolClassDAO;

    @Autowired
    private SubjectGradesDAO subjectGradesDAO;

    @Autowired
    ModelMapper modelMapper;

    @Override
    public List<AddStudentDTO> getStudentsByClassId(Integer classId) {
        List<Student> students =studentDAO.findBySchoolClassSchoolClassId(classId);
        return students.stream()
                .map(student -> modelMapper.map(student, AddStudentDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    public AddStudentDTO addStudent(AddStudentDTO addStudentDTO) {
//        boolean exists = studentDAO.existsByJmbg(addStudentDTO.getJmbg());
//        if (exists) {
//            throw new IllegalArgumentException("Student sa datim JMBG-om već postoji");
//        }

        Parent parent = parentDAO.findById(addStudentDTO.getParentId())
                .orElseThrow(() -> new IllegalArgumentException("Roditelj nije pronađen"));
        SchoolClass schoolClass = schoolClassDAO.findById(addStudentDTO.getSchoolClassId())
                .orElseThrow(() -> new IllegalArgumentException("Odjeljenje nije pronađeno"));

        System.out.println(parentStudentExists(parent.getParentId(), schoolClass.getSchoolYear().getSchoolYearId()));
        if(parentStudentExists(parent.getParentId(), schoolClass.getSchoolYear().getSchoolYearId())){
            throw new IllegalArgumentException("Potrebno je kreirati novi nalog za odabranog roditelja!");
        }
        Student student = modelMapper.map(addStudentDTO, Student.class);
        student.setParent(parent);
        student.setSchoolClass(schoolClass);

        Student savedStudent = studentDAO.save(student);
        return modelMapper.map(savedStudent, AddStudentDTO.class);
    }

    @Override
    public Optional<Student> findById(Integer studentId) {
        return studentDAO.findById(studentId);
    }

    @Override
    public StudentDetailsDTO getStudentDetails(Integer id) {
        return modelMapper.map(studentDAO.findById(id),StudentDetailsDTO.class);
    }

    @Override
    public List<StudentGradesForParentDTO> getStudentGradesByParentIdDateDesc(Integer parentId, Integer schoolYearId){
        Student student = new Student();
        if(!studentDAO.findAllByParent_ParentId(parentId).isEmpty()){
            student = studentDAO.findAllByParent_ParentId(parentId).get(0);
        }


        return subjectGradesDAO.findAllByStudent_StudentIdAndSchoolYear_SchoolYearIdAndFinalSubjectGradeOrderByDateDesc(student.getStudentId(),schoolYearId,false).stream().map((el) -> modelMapper.map(el, StudentGradesForParentDTO.class)).collect(Collectors.toList());

    }

    @Override
    public StudentDTO getStudentByParentId(Integer parentId) {
        Student student = new Student();
        if(!studentDAO.findAllByParent_ParentId(parentId).isEmpty()){
            student = studentDAO.findAllByParent_ParentId(parentId).get(0);
        }
        return modelMapper.map(student,StudentDTO.class);
    }

    @Override
    public boolean parentStudentExists(Integer parentId,Integer schoolYearId){

        if(studentDAO.findByParent_ParentIdAndSchoolClass_SchoolYear_SchoolYearId(parentId,schoolYearId).size()>0){
            return true;
        }else{
            return false;
        }
    }
}
