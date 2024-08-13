package com.example.ednevnikbackend.daos;

import com.example.ednevnikbackend.models.SchoolClass;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SchoolClassDAO extends JpaRepository<SchoolClass,Integer> {
}
