package com.example.ednevnikbackend.daos;

import com.example.ednevnikbackend.models.Absence;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AbsenceDAO extends JpaRepository<Absence, Integer> {
}
