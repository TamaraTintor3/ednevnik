package com.example.ednevnikbackend.daos;

import com.example.ednevnikbackend.models.Absence;
import com.example.ednevnikbackend.models.StudentClass;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface StudentClassDAO extends JpaRepository<StudentClass, Integer> {
    List<StudentClass> findByStudentStudentId(Integer studentId);
    StudentClass findByStudent_Parent_ParentIdAndSchoolClass_SchoolYear_SchoolYearId(Integer parentId,Integer schoolYearId);

}
