package com.example.ednevnikbackend.daos;

import com.example.ednevnikbackend.models.StudentClass;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StudentClassDAO extends JpaRepository<StudentClass, Integer> {
}
