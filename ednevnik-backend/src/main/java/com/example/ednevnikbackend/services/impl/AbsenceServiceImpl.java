package com.example.ednevnikbackend.services.impl;

import com.example.ednevnikbackend.daos.AbsenceDAO;
import com.example.ednevnikbackend.dtos.AbsenceDTO;
import com.example.ednevnikbackend.dtos.AbsenceUpdateDTO;
import com.example.ednevnikbackend.models.Absence;
import com.example.ednevnikbackend.models.SchoolYear;
import com.example.ednevnikbackend.models.Student;
import com.example.ednevnikbackend.services.AbsenceService;
import com.example.ednevnikbackend.services.SchoolClassService;
import com.example.ednevnikbackend.services.StudentService;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
public class AbsenceServiceImpl implements AbsenceService {

    @Autowired
    AbsenceDAO absenceDAO;

    @Autowired
    StudentService studentService;

    @Autowired
    ModelMapper modelMapper;
    @Autowired
    private SchoolClassService schoolClassService;

    @Override
    public Absence addAbsence(AbsenceDTO absenceDTO) {
        Student student = studentService.findById(absenceDTO.getStudentId())
                .orElseThrow(() -> new RuntimeException("Student not found"));

        Absence absence = new Absence();
        absence.setDateOfAbsence(absenceDTO.getDateOfAbsence());
        absence.setNumberOfClasses(absenceDTO.getNumberOfClasses());
        absence.setApproved(absenceDTO.getApproved());
        absence.setStudent(student);

        return absenceDAO.save(absence);

    }

    @Override
    public Absence updateAbsence(Integer absenceId, AbsenceUpdateDTO absenceUpdateDTO) {
        Absence existingAbsence = absenceDAO.findById(absenceId)
                .orElseThrow(() -> new RuntimeException("Absence not found"));

        existingAbsence.setReason(absenceUpdateDTO.getReason());
        existingAbsence.setApproved(absenceUpdateDTO.getApproved());

        return absenceDAO.save(existingAbsence);
    }

    @Override
    public List<Absence> getAbsencesByStudentId(Integer studentId) {
        return absenceDAO.findByStudentStudentId(studentId);
    }

    @Override
    public List<AbsenceDTO> getAbsencesForParent(Integer parentId) {
        SchoolYear schoolYear=schoolClassService.findCurrentSchoolYear();
        System.out.println(schoolYear.getYear()+" "+schoolYear.getSchoolYearId());
        return absenceDAO.findAllByStudent_Parent_ParentIdAndStudent_SchoolClass_SchoolYear_SchoolYearId(parentId,schoolYear.getSchoolYearId()).stream().map((a)->modelMapper.map(a,AbsenceDTO.class)).toList();
    }
}
