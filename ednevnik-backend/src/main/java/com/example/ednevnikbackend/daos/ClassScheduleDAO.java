package com.example.ednevnikbackend.daos;

import com.example.ednevnikbackend.models.ClassSchedule;
import com.example.ednevnikbackend.models.SchoolClass;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ClassScheduleDAO extends JpaRepository<ClassSchedule, Integer> {
    Optional<ClassSchedule> findBySchoolClassSchoolClassId(Integer schoolClassId);

}
