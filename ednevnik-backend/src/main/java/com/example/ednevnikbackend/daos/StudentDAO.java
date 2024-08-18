package com.example.ednevnikbackend.daos;

import com.example.ednevnikbackend.models.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StudentDAO extends JpaRepository<Student, Integer> {
    List<Student> findBySchoolClassSchoolClassId(Integer schoolClassId);
    boolean existsByJmbg(String jmbg);
}
