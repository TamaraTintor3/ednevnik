package com.example.ednevnikbackend.daos;

import com.example.ednevnikbackend.models.Professor;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProfessorDAO extends JpaRepository<Professor, Integer> {

    public Professor getProfessorByUser_UserId(Integer id);

}
