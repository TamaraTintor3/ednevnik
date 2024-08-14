package com.example.ednevnikbackend.services.impl;

import com.example.ednevnikbackend.daos.ParentDAO;
import com.example.ednevnikbackend.models.Parent;
import com.example.ednevnikbackend.services.ParentService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
public class ParentServiceImpl implements ParentService {

    @Autowired
    ParentDAO parentDAO;

    @Override
    public List<Parent> findAllParents() {
        return parentDAO.findAll();
    }
}
