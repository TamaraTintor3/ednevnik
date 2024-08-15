package com.example.ednevnikbackend.services;

import com.example.ednevnikbackend.dtos.ParentDTO;
import com.example.ednevnikbackend.models.Parent;

import java.util.List;

public interface ParentService {
     List<ParentDTO> findAllParents();
}
