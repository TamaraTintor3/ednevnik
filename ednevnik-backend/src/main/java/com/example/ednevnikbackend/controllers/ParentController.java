package com.example.ednevnikbackend.controllers;

import com.example.ednevnikbackend.models.Parent;
import com.example.ednevnikbackend.services.ParentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
public class ParentController {

    @Autowired
    ParentService parentService;

    @GetMapping("/parents")
    public ResponseEntity<List<Parent>> getAllParents() {
        List<Parent> parents = parentService.findAllParents();
        return ResponseEntity.ok(parents);
    }
}
