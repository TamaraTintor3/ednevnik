package com.example.ednevnikbackend.services.impl;

import com.example.ednevnikbackend.daos.ParentDAO;
import com.example.ednevnikbackend.dtos.ParentDTO;
import com.example.ednevnikbackend.models.Parent;
import com.example.ednevnikbackend.services.ParentService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class ParentServiceImpl implements ParentService {

    @Autowired
    ParentDAO parentDAO;

    @Override
    public List<ParentDTO> findAllParents() {
        List<Parent> parents = parentDAO.findAll();
        return parents.stream()
                .map(parent -> new ParentDTO(
                        parent.getParentId(),
                        parent.getUser().getFirstName(),
                        parent.getUser().getLastName()
                ))
                .collect(Collectors.toList());
    }
}
