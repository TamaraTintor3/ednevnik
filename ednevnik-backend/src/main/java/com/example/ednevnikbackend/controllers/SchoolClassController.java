package com.example.ednevnikbackend.controllers;

import com.example.ednevnikbackend.dtos.ProfessorDTO;

import com.example.ednevnikbackend.dtos.AddSchoolClassDTO;
import com.example.ednevnikbackend.dtos.AddStudentDTO;
import com.example.ednevnikbackend.models.SchoolClass;
import com.example.ednevnikbackend.dtos.SchoolClassDTO;
import com.example.ednevnikbackend.services.ProfessorService;
import com.example.ednevnikbackend.services.SchoolClassService;
import com.example.ednevnikbackend.services.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Comparator;
import java.util.List;

@RestController
    @RequestMapping("/api/school-classes")
public class SchoolClassController {
    @Autowired
    private SchoolClassService schoolClassService;

    @Autowired
    private ProfessorService professorService;

    @Autowired
    private StudentService studentService;


    @GetMapping
    public List<SchoolClassDTO> getAllSchoolClasses() {
        return schoolClassService.findAllSchoolClasses().stream().sorted(Comparator.comparing(SchoolClassDTO::getSchoolYearYear).reversed()).toList();
    }

    @GetMapping("/{id}")
    public SchoolClassDTO getAllSchoolClasses(@PathVariable Integer id) {
        return schoolClassService.findSchoolClassById(id);

    }

    @PostMapping("/addClass")
    public ResponseEntity<SchoolClass> createSchoolClass(@RequestBody AddSchoolClassDTO addSchoolClassDTO) {
        SchoolClass newSchoolClass = schoolClassService.addSchoolClass(addSchoolClassDTO);
        return new ResponseEntity<>(newSchoolClass, HttpStatus.CREATED);
    }


    @GetMapping("/byUserId/{id}")
    public List<SchoolClassDTO> getAllClassesByProfessorId(@PathVariable Integer id) {

        ProfessorDTO professorDTO = professorService.getProfessorByUserId(id);

        return schoolClassService.findAllClassesByProfessorId(professorDTO.getProfessorId());
    }
    @GetMapping("/{classId}/students")
    public ResponseEntity<List<AddStudentDTO>> getStudentsByClassId(@PathVariable Integer classId) {
        List<AddStudentDTO> students = studentService.getStudentsByClassId(classId);
        return ResponseEntity.ok(students);
    }

    @PostMapping("/{classId}/students/add")
    public ResponseEntity<AddStudentDTO> addStudentToClass(@PathVariable Integer classId, @RequestBody AddStudentDTO addStudentDTO) {
        addStudentDTO.setSchoolClassId(classId);
        AddStudentDTO addedStudent = null;

        addedStudent = studentService.addStudent(addStudentDTO);

        return ResponseEntity.ok(addedStudent);

    }


//    @GetMapping("/classByStudentIdAndSchoolYear/{studentId}/{schoolYearId}")
//    public SchoolClassDTO getClassByStudentIdAndSchoolYear(@PathVariable Integer studentId, @PathVariable Integer schoolYearId){
//
//    }

}