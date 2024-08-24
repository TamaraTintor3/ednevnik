package com.example.ednevnikbackend.daos;

import com.example.ednevnikbackend.models.Absence;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AbsenceDAO extends JpaRepository<Absence, Integer> {
    List<Absence> findByStudentStudentId(Integer studentId);
    List<Absence> findAllByStudent_Parent_ParentIdAndStudent_SchoolClass_SchoolYear_SchoolYearId(Integer parentId,Integer schoolYearId);
}
