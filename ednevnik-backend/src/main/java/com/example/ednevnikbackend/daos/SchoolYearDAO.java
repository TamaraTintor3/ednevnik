package com.example.ednevnikbackend.daos;

import com.example.ednevnikbackend.models.SchoolYear;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SchoolYearDAO extends JpaRepository<SchoolYear, Integer> {
    List<SchoolYear> findAllByOrderByYearDescSemesterDesc();
    List<SchoolYear> findByYearOrderBySemesterDesc(String year);

    SchoolYear findBySchoolYearId(Integer id);
}
