package com.example.ednevnikbackend.daos;

import com.example.ednevnikbackend.models.Message;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MessageDAO extends JpaRepository<Message,Integer> {
    List<Message> findAllByParent_ParentId(Integer parentId);
    List<Message> findAllByProfessor_ProfessorId(Integer professorId);
}
