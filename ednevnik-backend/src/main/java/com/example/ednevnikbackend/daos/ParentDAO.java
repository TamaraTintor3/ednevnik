package com.example.ednevnikbackend.daos;

import com.example.ednevnikbackend.models.Parent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ParentDAO extends JpaRepository<Parent, Integer> {
}
