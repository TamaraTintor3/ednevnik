package com.example.ednevnikbackend.controllers;

import com.example.ednevnikbackend.dtos.ShowUsersDTO;
import com.example.ednevnikbackend.dtos.UserDTO;
import com.example.ednevnikbackend.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {
    @Autowired
    UserService userService;

    @GetMapping("/showAll")
    public ResponseEntity<List<ShowUsersDTO>> getAllUsers(){
        List<ShowUsersDTO> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }
}
