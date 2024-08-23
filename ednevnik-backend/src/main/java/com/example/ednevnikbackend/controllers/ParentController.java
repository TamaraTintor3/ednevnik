package com.example.ednevnikbackend.controllers;

import com.example.ednevnikbackend.dtos.ParentDTO;
import com.example.ednevnikbackend.models.Parent;
import com.example.ednevnikbackend.services.ParentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/parents")
public class ParentController {

    @Autowired
    ParentService parentService;

    @GetMapping
    public List<ParentDTO> getAllParents() {
        return parentService.findAllParents();
    }

    @GetMapping("/byUserId/{userId}")
    public ParentDTO getParentByUserId(@PathVariable Integer userId) {
      return  parentService.findByUserId(userId);
    }

}
