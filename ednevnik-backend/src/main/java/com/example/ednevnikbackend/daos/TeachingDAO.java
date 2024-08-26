package com.example.ednevnikbackend.daos;

import com.example.ednevnikbackend.models.Professor;
import com.example.ednevnikbackend.models.Teaching;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TeachingDAO extends JpaRepository<Teaching, Integer> {

    List<Teaching> findAllByProfessorId(Integer id);

    List<Teaching> findAllBySchoolClassSchoolClassId(Integer id);

}
