package com.example.ednevnikbackend.daos;

import com.example.ednevnikbackend.models.Professor;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProfessorDAO extends JpaRepository<Professor, Integer> {

    public Professor getProfessorByUser_UserId(Integer id);

    public Professor findByProfessorId(Integer id);

   public List<Professor> getProfessorsBySubjectsEmpty();

}
